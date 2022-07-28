import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { setttngsStackParamList } from "./types";
import Profile from "../../screens/ProfileScreen";

const Stack = createNativeStackNavigator<setttngsStackParamList>();

const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
