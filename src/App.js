import { KeyboardAvoidingView, ScrollView } from "react-native";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import Main from "./PageLayout";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Jomhuria-Regular": require("../assets/Jomhuria-Regular.ttf"),
  });

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
        <KeyboardAvoidingView enabled={false}>
          <ScrollView>
            <Main />
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </AutocompleteDropdownContextProvider>
  );
}
