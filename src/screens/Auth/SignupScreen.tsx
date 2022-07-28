import { View, Text } from "react-native";
import React from "react";

import { Box, Button, StatusBar, VStack } from "native-base";
import { AuthScreenProps } from "../../navigations/authStack/types";

const SignupScreen: React.FC<AuthScreenProps<"Signup">> = ({
  navigation,
  route,
}) => {
  return (
    <>
      <StatusBar barStyle={"default"} />
      <VStack flex={1} justifyContent="center" alignItems="center">
        <Text>SignupScreen</Text>
        <Button
          variant="solid"
          px={5}
          colorScheme="secondary"
          onPress={() => {
            navigation.navigate("Signin");
          }}
        >
          sign in
        </Button>
      </VStack>
    </>
  );
};

export default SignupScreen;
