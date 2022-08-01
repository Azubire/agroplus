import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomStatusBar from "../../components/CustomStatusBar";

const AdHistory = () => {
  return (
    <SafeAreaView>
      <CustomStatusBar />
      <View>
        <Text>AdHistory</Text>
      </View>
    </SafeAreaView>
  );
};

export default AdHistory;
