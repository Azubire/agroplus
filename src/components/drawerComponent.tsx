import React from "react";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import DrawerIcon from "./DrawerIcon";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import {
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { DrawerScreenPropsType } from "../navigations/AppDrawer/Types";
import { useRoute } from "@react-navigation/native";
import { useAppDispatch } from "../hooks/reduxHooks";
import { logout } from "../store/features/userSlice";
const logo = require("../../assets/app_images/logo.png");

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const dispatch = useAppDispatch();
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
            <TouchableOpacity
              activeOpacity={0.6}
              style={{
                backgroundColor: "#be123c",
                borderRadius: 4,
                paddingVertical: 8,
              }}
              onPress={() => {
                props.navigation.navigate("Root", {
                  screen: "AppTabs",
                  params: { screen: "UploadCrop" },
                });
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="add" size={25} color="#fff" />
                <Text style={{ color: "#fff" }}>Create Advert</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu  */}
        <View style={{ paddingVertical: 10 }}>
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
        {/* <Divider /> */}

        {/* Menu-footer  */}
        <View>
          <View style={{ paddingHorizontal: 16 }}>
            <View
              style={{
                borderTopWidth: 0.4,
                borderTopColor: "gray",
                marginBottom: 16,
              }}
            ></View>
            <TouchableOpacity
              style={{ opacity: 0.7, marginBottom: 20 }}
              onPress={() => {
                props.navigation.navigate("Root", {
                  screen: "HelpAndSupport",
                });
              }}
            >
              <Text> Help And Support</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ opacity: 0.7, marginBottom: 20 }}
              onPress={() => {
                props.navigation.navigate("Root", {
                  screen: "TermsAndConditions",
                });
              }}
            >
              <Text>Terms And Conditions</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ width: "88%" }}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  backgroundColor: "#047857",
                  borderRadius: 4,
                  paddingVertical: 8,
                }}
                onPress={() => {
                  props.navigation.navigate("Root", {
                    screen: "AuthStack",
                    params: { screen: "SignIn" },
                  });
                  // dispatch(logout());
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#fff", marginHorizontal: 4 }}>
                    Login
                  </Text>
                  <Ionicons name="log-in" size={25} color="#fff" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
