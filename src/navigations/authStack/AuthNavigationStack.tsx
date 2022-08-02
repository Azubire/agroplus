import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "./types";
import SigninScreen from "../../screens/Auth/SigninScreen";
import SignupScreen from "../../screens/Auth/SignupScreen";
import WelcomeScreen from "../../screens/WelcomeScreens/Index";
import ScreenOne from "../../screens/WelcomeScreens/ScreenOne";
import ScreenTwo from "../../screens/WelcomeScreens/ScreenTwo";
import ScreenThree from "../../screens/WelcomeScreens/ScreenThree";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigationStack = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="WelcomeOne" component={ScreenOne} />
      <AuthStack.Screen name="WelcomeTwo" component={ScreenTwo} />
      <AuthStack.Screen name="WelcomeThree" component={ScreenThree} />
      <AuthStack.Screen name="Signin" component={SigninScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigationStack;
