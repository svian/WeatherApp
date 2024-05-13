import {AutocompleteDropdownContextProvider} from 'react-native-autocomplete-dropdown';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useEffect, useState} from 'react';
import {AsyncSavedData} from './classes/AsyncSavedData';
import {FetchWeatherData} from './classes/FetchWeatherData';
import {FetchGraphicData} from './classes/FetchGraphicData';
import {SplashScreen} from './SplashScreen';
import MainPage from './MainPage';
import {SearchAutoComplete} from './SearchBar';

export default function App() {
  const windowHeight = Dimensions.get('window').height + 50;

  const [isFirstRender, setIsFirstRender] = useState(true);
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  const asyncStorage = new AsyncSavedData();
  const [savedData, setSavedData] = useState(typeof AsyncSavedData);
  const [weatherData, setWeatherData] = useState(typeof FetchWeatherData);
  const [graphicsData, setGraphicsData] = useState(typeof FetchGraphicData);

  function onPressSearch(t_coords, t_name, t_units) {
    let t_data = {coords: t_coords, name: t_name, units: t_units};
    asyncStorage.saveLocation(t_data);
    callFetchData(t_data);
  }

  function callFetchData(data) {
    if (data.coords !== '' && data.name !== '' && data.units !== '') {
      console.log('init fetch');
      const fetchWeather = new FetchWeatherData(data);

      setTimeout(function () {
        const fetchGraphics = new FetchGraphicData(fetchWeather);

        setGraphicsData(fetchGraphics);
        setWeatherData(fetchWeather);

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
        console.log('call fetch');
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
                    asyncStorage={asyncStorage}
                    savedData={savedData}
                  />
                </View>
              </>
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
});
