import { View, Text, Button } from "react-native";
import React from "react";
import { TabScreenProps } from "../navigations/appTabs/types";

const Search: React.FC<TabScreenProps<"Search">> = ({ navigation }) => {
  return (
    <View>
      <Text>Search</Text>
      <Button
        title="Click Me"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
    </View>
  );
};

export default Search;
