import React from "react";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  VStack,
  Box,
  HStack,
  Icon,
  Pressable,
  Button,
  Divider,
  useTheme,
} from "native-base";
import DrawerIcon from "./DrawerIcon";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { DrawerScreenPropsType } from "../navigations/AppDrawer/Types";
import { useRoute } from "@react-navigation/native";
const logo = require("../../assets/app_images/logo.png");

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  // const { colors } = useTheme();
  // type obj = {
  //   screen: string;
  // };

  // const getActiveRoute = () => {
  //   let name = "";
  //   name = activeRouteName?.screen;
  //   return name;
  // };

  // // @ts-ignore
  // const activeRouteName: obj = props.state.routes[0].params;

  return (
    //  <StatusBar style="dark" />
    <DrawerContentScrollView {...props}>
      <View>
        {/* Menu-header  */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <View>
            <Image
              source={logo}
              style={{
                width: 80,
                height: 80,
              }}
            />
          </View>
          <View style={{ width: "88%" }}>
            <Button
              colorScheme={"rose"}
              onPress={() => {
                props.navigation.navigate("Root", {
                  screen: "AppTabs",
                  params: { screen: "UploadCrop" },
                });
              }}
              startIcon={<Ionicons name="add" size={24} color="#fff" />}
            >
              Create Advert
            </Button>
          </View>
        </View>

        {/* Menu  */}
        <View>
          <DrawerItem
            label="Menu"
            style={{ marginVertical: 0 }}
            onPress={() => {}}
          />
          <DrawerItem
            label={({ color }) => <Text style={{ color }}>Home</Text>}
            icon={({ focused, size, color }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            )}
            onPress={() => {
              props.navigation.navigate("Root", {
                screen: "AppTabs",
                params: { screen: "Home" },
              });
            }}
          />
          <DrawerItem
            label={({ color }) => <Text style={{ color }}>Distributors</Text>}
            icon={({ size, color }) => (
              <MaterialIcons
                name="emoji-transportation"
                size={size}
                color={color}
              />
            )}
            onPress={() => {
              props.navigation.navigate("Root", { screen: "Distributors" });
            }}
          />
          <DrawerItem
            label={({ color }) => <Text style={{ color }}>New Happenings</Text>}
            icon={({ focused, size, color }) => (
              <Ionicons
                name={focused ? "compass" : "compass-outline"}
                size={size}
                color={color}
              />
            )}
            onPress={() => {
              props.navigation.navigate("Root", {
                screen: "AppTabs",
                params: { screen: "Explore" },
              });
            }}
          />
          <DrawerItem
            label={({ color }) => <Text style={{ color }}>My Adverts</Text>}
            icon={({ focused, size, color }) => (
              <FontAwesome
                name={focused ? "address-card" : "address-book-o"}
                size={size}
                color={color}
              />
            )}
            onPress={() => {
              props.navigation.navigate("Root", { screen: "MyAds" });
            }}
          />
          <DrawerItem
            label={({ focused, color }) => (
              <Text style={{ color }}>About Us</Text>
            )}
            icon={({ focused, size, color }) => (
              <Ionicons
                name={
                  focused ? "information-circle" : "information-circle-outline"
                }
                size={size}
                color={color}
              />
            )}
            onPress={() => {
              props.navigation.navigate("Root", { screen: "AboutUs" });
            }}
          />
          <DrawerItem
            label={({ focused, color }) => (
              <Text style={{ color }}>Contact Us</Text>
            )}
            icon={({ focused, size, color }) => (
              <Ionicons
                name={focused ? "call" : "call-outline"}
                size={size}
                color={color}
              />
            )}
            onPress={() => {
              props.navigation.navigate("Root", { screen: "ContactUs" });
            }}
          />
        </View>
        <Divider />
        {/* Menu-footer  */}
        <View>
          <View style={{ paddingLeft: 8 }}>
            <Button
              variant="link"
              _text={{ color: "gray.700" }}
              justifyContent="flex-start"
              onPress={() => {
                props.navigation.navigate("HelpAndSupport");
              }}
            >
              Help And Support
            </Button>
            <Button
              variant="link"
              _text={{ color: "gray.700" }}
              justifyContent="flex-start"
              onPress={() => {
                props.navigation.navigate("Root", {
                  screen: "TermsAndConditions",
                });
              }}
            >
              Terms And Conditions
            </Button>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ width: "88%" }}>
              <Button
                colorScheme="tertiary"
                endIcon={<Ionicons name="log-in" size={24} color="#fff" />}
                onPress={() => {
                  props.navigation.navigate("Root", {
                    screen: "AuthStack",
                    params: "Signin",
                  });
                }}
              >
                Login
              </Button>
            </View>
          </View>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
