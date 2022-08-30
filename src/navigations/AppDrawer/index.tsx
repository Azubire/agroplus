import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { DrawerParamList } from "./Types";
import RootStack from "../AppStack";
import CustomDrawerContent from "../../components/drawerComponent";
import WelcomeStack from "../Welcome/WelcomeStack";
import WelcomeScreen from "../../screens/WelcomeScreens/Index";
import ScreenOne from "../../screens/WelcomeScreens/ScreenOne";
import ScreenTwo from "../../screens/WelcomeScreens/ScreenTwo";
import ScreenThree from "../../screens/WelcomeScreens/ScreenThree";

const Drawer = createDrawerNavigator<DrawerParamList>();

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      useLegacyImplementation={true}
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Welcome" component={WelcomeScreen} />
      <Drawer.Screen name="ScreenOne" component={ScreenOne} />
      <Drawer.Screen name="ScreenTwo" component={ScreenTwo} />
      <Drawer.Screen name="ScreenThree" component={ScreenThree} />
      {/* <Drawer.Screen name="" component={RootStack} /> */}
      <Drawer.Screen name="Root" component={RootStack} />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
