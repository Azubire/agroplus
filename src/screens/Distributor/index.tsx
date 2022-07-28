import { View, Text } from "react-native";
import React from "react";
import { RootStackScreenProps } from "../../navigations/AppStack/types";
import { Button } from "native-base";

const Distributors: React.FC<RootStackScreenProps<"Distributors">> = ({
  navigation,
  route,
}) => {
  return (
    <View>
      <Text>Distributors</Text>
      <Button
        onPress={() => {
          navigation.navigate("DistributorDetails");
        }}
      >
        goto Details
      </Button>
    </View>
  );
};

export default Distributors;
