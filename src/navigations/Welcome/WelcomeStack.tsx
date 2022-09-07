import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WelcomeStackParamList } from "./types";
import WelcomeScreen from "../../screens/WelcomeScreens/Index";
import ScreenOne from "../../screens/WelcomeScreens/ScreenOne";
import ScreenTwo from "../../screens/WelcomeScreens/ScreenTwo";
import ScreenThree from "../../screens/WelcomeScreens/ScreenThree";

const Stack = createNativeStackNavigator<WelcomeStackParamList>();

const WelcomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="ScreenOne" component={ScreenOne} />
      <Stack.Screen name="ScreenTwo" component={ScreenTwo} /> */}
      <Stack.Screen name="ScreenThree" component={ScreenThree} />
    </Stack.Navigator>
  );
};

export default WelcomeStack;
