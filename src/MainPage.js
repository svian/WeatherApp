import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { FetchData } from "./classes/FetchData.js";
import { VisualData } from "./classes/VisualData.js";
import WeatherPage from "./WeatherPage.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SearchAutoComplete } from "./SearchBar.js";
import * as SplashScreen from "expo-splash-screen";

export default function MainPage() {
  const [dataLoaded, setDataLoaded] = useState(true);
  const [weather, setWeather] = useState(typeof FetchData);
  const [visuals, setVisuals] = useState(typeof VisualData);
  const [didLoadSave, setDidLoadSave] = useState(false);

  const [currentLocation, setCurrentLocation] = useState({
    coords: "42.3554334 -71.060511",
    name: "Boston, MA",
  });

  const onLayoutRootView = useCallback(async () => {
    if (dataLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [dataLoaded]);

  const storeData = async (n_location) => {
    try {
      const jsonValue = JSON.stringify(n_location);
      await AsyncStorage.setItem("location", jsonValue);
    } catch (e) {
      console.error("Error saving data:", e);
    }
  };

  const getData = async () => {
    try {
      let t_currentLocation;
      const jsonValue = await AsyncStorage.getItem("location");
      if (jsonValue !== null) {
        t_currentLocation = JSON.parse(jsonValue);
      } else {
        t_currentLocation = currentLocation;
      }

      setCurrentLocation(t_currentLocation);
      callFetchData(t_currentLocation.coords, t_currentLocation.name);
    } catch (e) {
      console.error("Error fetching stored data:", e);
    }
  };

  async function callFetchData(coords, name) {
    setDataLoaded(false);

    if (coords !== "" && name !== "") {
      const n_location = { coords: coords, name: name };
      storeData(n_location);
      const fetchData = new FetchData(coords);

      setTimeout(function () {
        const visualData = new VisualData(fetchData.time, fetchData.type);

        setWeather(fetchData);
        setVisuals(visualData);

        setDataLoaded(true);
      }, 2000);
    }
  }

  function onPressSearch(coords, name) {
    setDataLoaded(false);
    if (name !== "" && coords !== "") {
      setCurrentLocation({ coords: coords, name: name });
      callFetchData(coords, name);
    }
  }

  useEffect(() => {
    if (!didLoadSave) {
      console.log("call");
      getData();
      setDidLoadSave(true);
    }
  }, [didLoadSave]);

  if (!dataLoaded) {
    return null;
  }

  return (
    <View
      style={[
        {
          backgroundColor: visuals.theme ? visuals.theme.background : null,
        },
        styles.view,
      ]}
      onLayout={onLayoutRootView}
    >
      <View style={styles.searchbar}>
        <SearchAutoComplete
          saved={currentLocation.coords}
          onSetSelectedItem={(coords, name) => {
            coords && name && onPressSearch(coords, name);
          }}
        />
      </View>
      <View style={styles.display}>
        <WeatherPage temp={weather.temp} visuals={visuals} />
      </View>
      <StatusBar />
      {!dataLoaded && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
  },
  searchbar: {
    flex: 1,
  },
  display: {
    flex: 4,
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});
