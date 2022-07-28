import { View, Text } from "react-native";
import React from "react";
import { Button } from "native-base";
import { DrawerScreenPropsType } from "../navigations/AppDrawer/Types";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabScreenProps } from "../navigations/appTabs/types";

const UploadCrop: React.FC<TabScreenProps<"UploadCrop">> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>UploadCrop</Text>
      <Button
        onPress={() => {
          navigation.navigate("Search");
        }}
      >
        Go to search
      </Button>
    </View>
  );
};

export default UploadCrop;
