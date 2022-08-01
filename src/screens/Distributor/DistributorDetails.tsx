import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomStatusBar from "../../components/CustomStatusBar";
import { RootStackScreenProps } from "../../navigations/AppStack/types";

const DistributorDetails = ({
  navigation,
  route,
}: RootStackScreenProps<"DistributorDetails">) => {
  const { id } = route.params;
  return (
    <SafeAreaView>
      <CustomStatusBar />
      <View>
        <Text>DistributorDetails</Text>
        <Text>{id}</Text>
      </View>
    </SafeAreaView>
  );
};

export default DistributorDetails;
