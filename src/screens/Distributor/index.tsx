import { View, Text } from "react-native";
import React from "react";
import { RootStackScreenProps } from "../../navigations/AppStack/types";
import { Button } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomStatusBar from "../../components/CustomStatusBar";

const Distributors: React.FC<RootStackScreenProps<"Distributors">> = ({
  navigation,
  route,
}) => {
  return (
    <>
      <CustomStatusBar />
      <View>
        <Text>Distributors</Text>
        {/* <Button
          onPress={() => {
            navigation.navigate("DistributorDetails");
          }}
        >
          goto Details
        </Button> */}
      </View>
    </>
  );
};

export default Distributors;
