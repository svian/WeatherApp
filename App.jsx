/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {StyleSheet, View, Dimensions} from 'react-native';
import {AutocompleteDropdownContextProvider} from 'react-native-autocomplete-dropdown';
import React from 'react';

function App() {
  const windowHeight = Dimensions.get('window').height + 50;
  return (
    <AutocompleteDropdownContextProvider>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{minHeight: windowHeight, backgroundColor: '#CDE9F1'}}></View>
    </AutocompleteDropdownContextProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
