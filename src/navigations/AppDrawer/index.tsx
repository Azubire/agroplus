import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { DrawerParamList } from "./Types";
import RootStack from "../AppStack";
import CustomDrawerContent from "../../components/drawerComponent";

const Drawer = createDrawerNavigator<DrawerParamList>();

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Root" component={RootStack} />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
