import React, { memo, useCallback, useRef, useState } from "react";
import { Dimensions, Text, View, Platform } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

import { REACT_APP_API_KEY, REACT_APP_BASE_URL } from "@env";
import { States } from "./StateAbbr";

export const SearchAutoComplete = memo(function SearchAutoComplete(props) {
  const [loading, setLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState(null);
  //const [selectedItem, setSelectedItem] = useState(null);
  const dropdownController = useRef(null);
  const apiKey = REACT_APP_API_KEY;
  const baseURL = REACT_APP_BASE_URL;

  const searchRef = useRef(null);

  const getSuggestions = useCallback(async (q) => {
    console.log("getSuggestions", q);
    if (typeof q !== "string" || q.length < 3) {
      setSuggestionsList(null);
      return;
    }
    setLoading(true);
    const response = await fetch(
      `${baseURL}geo/1.0/direct?q=${q}&limit=5&appid=${apiKey}`
    );
    const test = new States();
    const items = await response.json();
    const suggestions = items.map((item) => ({
      id: item.lat + " " + item.lon,
      title:
        item.country === "US"
          ? item.name + ", " + test.getAbbr(item.state)
          : item.name + ", " + item.country,
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
          { flex: 1, flexDirection: "row", alignItems: "center" },
          Platform.select({ ios: { zIndex: 1 } }),
        ]}
      >
        <AutocompleteDropdown
          ref={searchRef}
          controller={(controller) => {
            dropdownController.current = controller;
          }}
          direction={Platform.select({ md: "down" })}
          dataSet={suggestionsList}
          onChangeText={getSuggestions}
          onSelectItem={(item) => {
            item && props.onSetSelectedItem(item.id, item.title);
          }}
          debounce={600}
          suggestionsListMaxHeight={Dimensions.get("window").height * 0.4}
          onClear={onClearPress}
          loading={loading}
          useFilter={false} // set false to prevent rerender twice
          textInputProps={{
            placeholder: props.saved,
            autoCorrect: false,
            autoCapitalize: "none",
            style: {
              borderRadius: 25,
              color: "#fff",
              paddingLeft: 18,
              fontFamily: "Jomhuria-Regular",
              fontSize: 24,
              letterSpacing: 7,
            },
          }}
          rightButtonsContainerStyle={{
            right: 8,
            height: 30,
            alignSelf: "center",
          }}
          inputContainerStyle={{
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: 25,
          }}
          suggestionsListContainerStyle={{
            backgroundColor: "#fff",
          }}
          containerStyle={{ flexGrow: 1, flexShrink: 1 }}
          renderItem={(item) => (
            <Text
              style={{
                fontFamily: "Jomhuria-Regular",
                fontSize: 20,
                letterSpacing: 4,
                color: "black",
                padding: 10,
              }}
            >
              {item.title}
            </Text>
          )}
          inputHeight={50}
          showChevron={false}
          closeOnBlur={false}
        />
      </View>
    </>
  );
});
