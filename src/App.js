import { StyleSheet, View } from "react-native";
import { useState } from "react";
import * as Font from "expo-font";
import Main from "./Main";

const fetchFonts = () => {
  return Font.loadAsync({
    "Jomhuria-Regular": require("../assets/Jomhuria-Regular.ttf"),
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    fetchFonts();
    setDataLoaded(true);
  }

  return (
    <>
      {dataLoaded && (
        <View style={styles.container}>
          <Main />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "Jomhuria-Regular",
    backgroundColor: "#D9D9D9",
    width: "100%",
    alignItems: "center",
  },
});
