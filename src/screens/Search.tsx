import { Text, Button } from "react-native";
import React from "react";
import { TabScreenProps } from "../navigations/appTabs/types";
import CustomStatusBar from "../components/CustomStatusBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { FormControl, Input, View } from "native-base";

const Search: React.FC<TabScreenProps<"Search">> = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View>
        <FormControl mt={8} px={2}>
          <FormControl.Label>Search</FormControl.Label>
          <Input placeholder="Type Anything To Search" />
        </FormControl>
      </View>
    </SafeAreaView>
  );
};

export default Search;
