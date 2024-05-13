import React, {memo, useCallback, useRef, useState} from 'react';
import {Dimensions, Text, View, Platform} from 'react-native';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';

import {REACT_APP_API_KEY, REACT_APP_BASE_URL} from '@env';
import {States} from './classes/StateAbbr';

export const SearchAutoComplete = memo(function SearchAutoComplete(props) {
  const [loading, setLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState(null);
  const dropdownController = useRef(null);
  const apiKey = REACT_APP_API_KEY;
  const baseURL = REACT_APP_BASE_URL;

  const searchRef = useRef(null);

  const getSuggestions = useCallback(async q => {
    console.log('getSuggestions', q);
    if (typeof q !== 'string' || q.length < 3) {
      setSuggestionsList(null);
      return;
    }
    setLoading(true);
    let response;
    const state = new States();
    if (q.includes(', ')) {
      const str = q.split(', ');
      str[1] = state.getAbbr(str[1]) !== null ? state.getAbbr(str[1]) : str[1];
      response = await fetch(
        `${baseURL}geo/1.0/direct?q=${str[0]},${str[1]}&limit=5&appid=${apiKey}`,
      );
    } else {
      response = await fetch(
        `${baseURL}geo/1.0/direct?q=${q}&limit=5&appid=${apiKey}`,
      );
    }

    const items = await response.json();
    const suggestions = items.map(item => ({
      id: item.lat + ' ' + item.lon,
      title:
        item.country === 'US'
          ? item.name + ', ' + state.getAbbr(item.state)
          : item.name + ', ' + item.country,
    }));
    setSuggestionsList(suggestions);
    setLoading(false);
  }, []);

  const onClearPress = useCallback(() => {
    setSuggestionsList(null);
  }, []);

  return (
    <>
      <View
        style={[
          {flex: 1, flexDirection: 'row', alignItems: 'center'},
          Platform.select({ios: {zIndex: 1}}),
        ]}>
        <AutocompleteDropdown
          ref={searchRef}
          controller={controller => {
            dropdownController.current = controller;
          }}
          direction={Platform.select({md: 'down'})}
          dataSet={suggestionsList}
          onChangeText={getSuggestions}
          clearOnFocus={false}
          onSelectItem={item => {
            item && props.onSetSelectedItem(item.id, item.title);
          }}
          debounce={600}
          suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
          onClear={onClearPress}
          loading={loading}
          useFilter={false} // set false to prevent rerender twice
          textInputProps={{
            placeholder: props.saved,
            autoCorrect: false,
            autoCapitalize: 'none',
            style: {
              color: '#fff',
              paddingLeft: 18,
              fontFamily: 'Jomhuria-Regular',
              fontSize: 20,
              position: 'absolute',
              paddingVertical: 0,
              letterSpacing: 7,
              width: '100%',
            },
          }}
          rightButtonsContainerStyle={{
            right: 8,
            height: 30,
            alignSelf: 'center',
            position: 'absolute',
          }}
          inputContainerStyle={{
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: 25,
            height: 40,
          }}
          suggestionsListContainerStyle={{
            backgroundColor: '#fff',
          }}
          containerStyle={{flexGrow: 1, flexShrink: 1}}
          renderItem={item => (
            <Text
              style={{
                fontFamily: 'Jomhuria-Regular',
                fontSize: 20,
                letterSpacing: 4,
                color: 'grey',
              }}>
              {item.title}
            </Text>
          )}
          inputHeight={40}
          showChevron={false}
          closeOnBlur={true}
        />
      </View>
    </>
  );
});
