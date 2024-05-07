import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useEffect, useState } from "react";
import { FetchData } from "./FetchData.js";
import { VisualData } from "./VisualData.js";
import Page3 from "./ResultsDisplay.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SearchAutoComplete } from "./SearchBar.js";

export default function Main() {
  const [dataLoaded, setDataLoaded] = useState(true);
  const [weather, setWeather] = useState(typeof FetchData);
  const [visuals, setVisuals] = useState(typeof VisualData);
  const [didLoadSave, setDidLoadSave] = useState(false);

  const [currentLocation, setCurrentLocation] = useState({
    coords: "42.3554334 -71.060511",
    name: "Boston, MA",
  });

  const storeData = async (n_location) => {
    try {
      const jsonValue = JSON.stringify(n_location);
      console.log("storing " + jsonValue);
      await AsyncStorage.setItem("location", jsonValue);
    } catch (e) {
      console.error("Error saving data:", e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("location");
      const t_currentLocation = JSON.parse(jsonValue);
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
    console.log("Fetching " + name);
    setDataLoaded(false);
    if (name !== "" && coords !== "") {
      setCurrentLocation({ coords: coords, name: name });
      callFetchData(coords, name);
    }
  }

  function getViewStyle(color) {
    return {
      fontFamily: "Jomhuria-Regular",
      backgroundColor: color,
      flexDirection: "column",
      flex: 1,
      padding: 20,
      width: "100%",
    };
  }

  useEffect(() => {
    if (!didLoadSave) {
      console.log("call");
      getData();
      setDidLoadSave(true);
    }
  }, [didLoadSave]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        <View style={getViewStyle(visuals.backgroundColor)}>
          <View style={styles.search}>
            <View style={styles.searchConatiner}>
              <SearchAutoComplete
                saved={currentLocation.name}
                onSetSelectedItem={(coords, name) =>
                  onPressSearch(coords, name)
                }
              />
            </View>
          </View>
          <View style={styles.visuals}>
            <Page3 temp={weather.temp} visuals={visuals} />
          </View>
        </View>
        <StatusBar />
        {!dataLoaded && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  visuals: {
    flex: 4,
    width: "100%",
    flexDirection: "row",
  },
  search: {
    flex: 1,
  },
  searchConatiner: {
    flexDirection: "row",
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
  loaded: {
    height: "100%",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0)",
  },
});
