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

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="AppTabs"
        component={AppTabs}
      />
      {/* distributors  */}
      <Stack.Screen name="Distributors" component={Distributors} />
      <Stack.Screen name="DistributorDetails" component={DistributorDetails} />
      <Stack.Screen name="MyAds" component={AdHistory} />
      <Stack.Screen name="AboutUs" component={AboutUS} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <Stack.Screen name="AuthStack" component={AuthNavigationStack} />
    </Stack.Navigator>
  );
};

export default RootStack;
