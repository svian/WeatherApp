import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Image, View } from "react-native";
import { ActivityIndicator, TextInput } from "react-native-web";
import { useEffect, useState } from "react";
import { FetchData } from "./FetchData";
import { VisualData } from "./VisualData";
import Page3 from "./Page3";

export default function Main() {
  const [dataLoaded, setDataLoaded] = useState(true);
  const [input, setInput] = useState(localStorage.getItem("location") ?? "");
  const [weather, setWeather] = useState(typeof FetchData);
  const [visuals, setVisuals] = useState(typeof VisualData);
  const [didLoadSave, setDidLoadSave] = useState(false);

  async function callFetchData() {
    setDataLoaded(false);
    if (input !== "") {
      //const location = document.getElementById("locationInput").value;
      localStorage.setItem("location", input);

      const fetchData = new FetchData(input);
      setTimeout(function () {
        console.log("Fetch: " + fetchData.getWeatherValues());

        const visualData = new VisualData(fetchData.time, fetchData.type);

        setWeather(fetchData);
        setVisuals(visualData);

        setDataLoaded(true);
      }, 2000);
    }
  }

  function getViewStyle(color) {
    return {
      fontFamily: "Jomhuria-Regular",
      backgroundColor: color,
      width: "100%",
      height: "100%",
      alignItems: "center",
    };
  }

  useEffect(() => {
    if (!didLoadSave && localStorage.getItem("location") !== null) {
      console.log("call");
      callFetchData();
      setDidLoadSave(true);
    }
  }, [didLoadSave]);

  return (
    <>
      <View style={getViewStyle(visuals.backgroundColor)}>
        {dataLoaded ? (
          <>
            <div style={styles.main}>
              <TextInput
                id="locationInput"
                style={styles.searchbar}
                placeholder="Search by City"
                value={input}
                onChangeText={setInput}
              />
              <Pressable onPress={callFetchData}>
                <Image
                  style={styles.searchIcon}
                  source={require("../assets/icons/SearchIcon.svg")}
                />
              </Pressable>
            </div>
            <div>
              <Page3 temp={weather.temp} visuals={visuals} />
            </div>
          </>
        ) : (
          <ActivityIndicator
            style={styles.loading}
            animating={!dataLoaded}
            size="large"
          />
        )}
        <StatusBar style="auto" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "Jomhuria-Regular",
    backgroundColor: "#D9D9D9",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  main: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  searchbar: {
    backgroundColor: "rgba(0,0,0,0.2)",
    fontFamily: "Jomhuria-Regular",
    fontSize: "24px",
    letterSpacing: "7px",
    color: "#FFFFFF",
    height: "40px",
    width: "90%",
    borderRadius: "20px",
    paddingLeft: "15px",
    marginTop: "20px",
  },
  searchIcon: {
    marginLeft: "-50px",
    alignSelf: "center",
    marginTop: "30px",
  },
  loading: {
    height: "100%",
    justifyContent: "center",
  },
});
