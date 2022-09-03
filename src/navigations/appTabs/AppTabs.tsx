import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import Home from "../../screens/HomeScreen";
import { DrawerActions } from "@react-navigation/native";
import { TabParamList, TabScreenProps } from "./types";
import Search from "../../screens/Search";
import Explore from "../../screens/Explore";
import UploadCrop from "../../screens/UploadCrop";
import { Badge, Box, HStack, useTheme, VStack } from "native-base";
import Settings from "../../screens/Settings";
import { useAppSelector } from "../../hooks/reduxHooks";
import { getCart } from "../../store/features/cartSlice";

const Tab = createBottomTabNavigator<TabParamList>();

const AppTabs = () => {
  const { colors } = useTheme();
  const state = useAppSelector(getCart);
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
        options={({ navigation }: TabScreenProps<"Home">) => ({
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
            <HStack w={100} justifyContent="space-evenly" alignItems="center">
              <VStack>
                <Badge
                  mb={-4}
                  mr={-3}
                  alignSelf="flex-end"
                  rounded="full"
                  colorScheme="danger"
                  variant="solid"
                  zIndex={1}
                  _text={{
                    fontSize: 10,
                  }}
                >
                  {state.items.length}
                </Badge>
                <Ionicons name="cart" pr={4} size={26} color={"#fff"} />
              </VStack>
              <Ionicons name={"notifications"} size={26} color={"#fff"} />
            </HStack>
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
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default AppTabs;
