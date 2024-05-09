import { View, Dimensions } from "react-native";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import MainPage from "./src/MainPage";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Jomhuria-Regular": require("../assets/Jomhuria-Regular.ttf"),
  });
  const windowHeight = Dimensions.get("window").height + 50;

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AutocompleteDropdownContextProvider>
      {fontsLoaded && (
        <View
          style={{ minHeight: windowHeight, backgroundColor: "#CDE9F1" }}
          onLayout={onLayoutRootView}
        >
          <MainPage />
        </View>
      )}
    </AutocompleteDropdownContextProvider>
  );
}
