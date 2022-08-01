import { View, Text } from "react-native";
import React from "react";
import { Button } from "native-base";
import { DrawerScreenPropsType } from "../navigations/AppDrawer/Types";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabScreenProps } from "../navigations/appTabs/types";
import CustomStatusBar from "../components/CustomStatusBar";

const UploadCrop: React.FC<TabScreenProps<"UploadCrop">> = ({ navigation }) => {
  return (
    <SafeAreaView>
      <CustomStatusBar />

      <View>
        <Text>Upload</Text>
      </View>
    </SafeAreaView>
  );
};

export default UploadCrop;
