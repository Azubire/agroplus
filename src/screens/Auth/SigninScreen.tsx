import { View, Text } from "react-native";
import React from "react";

import { Button, StatusBar, VStack } from "native-base";
import { AuthScreenProps } from "../../navigations/authStack/types";

const SigninScreen: React.FC<AuthScreenProps<"Signin">> = ({ navigation }) => {
  return (
    <>
      <StatusBar barStyle={"default"} />
      <VStack flex={1} justifyContent="center" alignItems="center">
        <Text>SigninScreen</Text>
        <Button
          variant="solid"
          onPress={() => {
            navigation.navigate("Root", {
              screen: "AppTabs",
              params: { screen: "Home" },
            });
          }}
        >
          Login
        </Button>
        <Button
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          Signup
        </Button>
      </VStack>
    </>
  );
};

export default SigninScreen;
