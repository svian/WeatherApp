import {AutocompleteDropdownContextProvider} from 'react-native-autocomplete-dropdown';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';
import {useEffect, useState} from 'react';
import {AsyncSavedData} from './classes/AsyncSavedData';
import {FetchWeatherData} from './classes/FetchWeatherData';
import {FetchGraphicData} from './classes/FetchGraphicData';
import {SplashScreen} from './SplashScreen';
import MainPage from './MainPage';
import {SearchAutoComplete} from './SearchBar';
import {FetchForecastData} from './classes/FetchForecastData';

export default function App() {
  const windowHeight = Dimensions.get('window').height + 50;

  const [isFirstRender, setIsFirstRender] = useState(true);
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);

  const asyncStorage = new AsyncSavedData();
  const [savedData, setSavedData] = useState(typeof AsyncSavedData);
  const [weatherData, setWeatherData] = useState(typeof FetchWeatherData);
  const [graphicsData, setGraphicsData] = useState(typeof FetchGraphicData);
  const [forecastData, setForecastData] = useState(typeof FetchForecastData);

  function onPressSearch(t_coords, t_name) {
    let t_data = {coords: t_coords, name: t_name, units: savedData.units};
    asyncStorage.saveLocation(t_data);
    callFetchData(t_data);
  }

  function handleChangeUnits(t_units) {
    let t_data = {
      coords: savedData.coords,
      name: savedData.name,
      units: t_units,
    };
    setSavedData(t_data);
    callFetchData(t_data);
  }

  function callFetchData(data) {
    setDataLoading(true);
    if (data.coords !== '' && data.name !== '' && data.units !== '') {
      console.log('fetch ' + data.units);
      const fetchWeather = new FetchWeatherData(data);
      const fetchForecast = new FetchForecastData(data);
      setTimeout(function () {
        const fetchGraphics = new FetchGraphicData(fetchWeather);

        setGraphicsData(fetchGraphics);
        setWeatherData(fetchWeather);
        setForecastData(fetchForecast);

        setDataLoading(false);
        if (showSplashScreen) {
          setShowSplashScreen(false);
        }
      }, 2000);
    }
  }

  useEffect(() => {
    if (isFirstRender) {
      asyncStorage.initSavedData();

      setTimeout(function () {
        setSavedData(asyncStorage);
        callFetchData(asyncStorage);
      }, 2000);

      setIsFirstRender(false);
    }
  }, [isFirstRender]);

  return (
    <SplashScreen isAppReady={!showSplashScreen}>
      <AutocompleteDropdownContextProvider>
        {!showSplashScreen && (
          <View
            style={{
              minHeight: windowHeight,
              backgroundColor: graphicsData.theme
                ? graphicsData.theme.secondary
                : null,
            }}>
            {weatherData && graphicsData && (
              <>
                <View style={styles.searchbar}>
                  <SearchAutoComplete
                    saved={weatherData.name}
                    onSetSelectedItem={(coords, name) => {
                      coords && name && onPressSearch(coords, name);
                    }}
                  />
                </View>
                <View style={styles.container}>
                  <MainPage
                    weather={weatherData}
                    graphics={graphicsData}
                    forecast={forecastData}
                    asyncStorage={asyncStorage}
                    savedData={savedData}
                    onChangeUnits={e => handleChangeUnits(e)}
                  />
                </View>
              </>
            )}
            {dataLoading && (
              <View style={styles.loading}>
                <ActivityIndicator size="large" />
              </View>
            )}
          </View>
        )}
      </AutocompleteDropdownContextProvider>
    </SplashScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
  },
  searchbar: {
    flex: 1,
    width: '95%',
    alignSelf: 'center',
    marginVertical: '-2%',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
