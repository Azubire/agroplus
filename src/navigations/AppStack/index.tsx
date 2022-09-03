import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import AppTabs from "../appTabs/AppTabs";
import Distributors from "../../screens/Distributor";
import DistributorDetails from "../../screens/Distributor/DistributorDetails";
import AboutUS from "../../screens/AboutUS";
import AdHistory from "../../screens/MyAds";
import ContactUs from "../../screens/ContactUs";
import AuthNavigationStack from "../authStack/AuthNavigationStack";
import HelpAndSupport from "../../screens/HelpAndSupport";
import TermsAndConditions from "../../screens/TermsAndConditions";
import { useTheme } from "native-base";
import NewsDetails from "../../screens/Explore/NewsDetails";
import Farmer from "../../screens/Farmer/Farmer";
import FarmerDetails from "../../screens/Farmer/FarmerDetails";
import Cart from "../../screens/cart";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: colors.tertiary[700],
        },
        headerTintColor: colors.light[100],
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="AppTabs"
        component={AppTabs}
      />
      <Stack.Screen name="Cart" component={Cart} />
      {/* distributors  */}
      <Stack.Screen name="Distributors" component={Distributors} />
      <Stack.Screen
        name="DistributorDetails"
        options={{ title: "" }}
        component={DistributorDetails}
      />
      <Stack.Screen name="FarmProduce" component={Farmer} />
      <Stack.Screen name="FarmProduceDetails" component={FarmerDetails} />
      <Stack.Screen name="MyAds" component={AdHistory} />
      <Stack.Screen name="AboutUs" component={AboutUS} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <Stack.Screen name="NewsDetails" component={NewsDetails} />
      <Stack.Screen
        name="AuthStack"
        options={{ headerTitle: "" }}
        component={AuthNavigationStack}
      />
      {/* <Stack.Screen
        name="WelcomeStack"
        component={WelcomeStack}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
};

export default RootStack;
