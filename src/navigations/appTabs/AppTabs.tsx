import React from "react";
import {
  BottomTabBarProps,
  BottomTabHeaderProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import Home from "../../screens/HomeScreen";
import { DrawerActions } from "@react-navigation/native";
import { TabParamList, TabScreenProps } from "./types";
import Search from "../../screens/Search";
import Explore from "../../screens/Explore";
import UploadCrop from "../../screens/UploadCrop";
import { useTheme } from "native-base";

const Tab = createBottomTabNavigator<TabParamList>();

const AppTabs = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Explore":
              iconName = focused ? "compass" : "compass-outline";
              break;

            case "Search":
              iconName = focused ? "search" : "search";
              break;
            case "Settings":
              iconName = focused ? "cog" : "cog-outline";
              break;

            default:
              break;
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={30} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: { height: 60 },
        tabBarActiveTintColor: colors.tertiary[700],
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={({ route, navigation }: TabScreenProps<"Home">) => ({
          headerLeft: (props) => (
            <Ionicons
              name={"menu"}
              size={30}
              color={colors.white}
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer);
              }}
            />
          ),
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.tertiary[700],
          },
          headerLeftContainerStyle: {
            paddingLeft: 10,
          },
          headerTitleStyle: { color: "#fff" },
          headerRightContainerStyle: {
            paddingRight: 10,
          },
          headerShown: true,

          headerRight: (props) => (
            <Ionicons name={"notifications"} size={26} color={"#fff"} />
          ),
        })}
      />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "add-circle" : "add-circle"}
                size={60}
                color={focused ? colors.tertiary[700] : colors.rose[500]}
              />
            );
          },
          tabBarIconStyle: { marginTop: -3 },
        }}
        name="UploadCrop"
        component={UploadCrop}
      />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Settings" component={Home} />
    </Tab.Navigator>
  );
};

export default AppTabs;
