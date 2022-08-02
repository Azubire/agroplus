import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { DrawerScreenProps } from "@react-navigation/drawer";
import {
  CompositeScreenProps,
  NavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { DrawerParamList, DrawerScreenPropsType } from "../AppDrawer/Types";
import { TabParamList, TabScreenProps } from "../appTabs/types";
import { AuthStackParamList } from "../authStack/types";

export type RootStackParamList = {
  AppTabs: NavigatorScreenParams<TabParamList>;
  Distributors: undefined;
  DistributorDetails: { id: string };
  FarmProduce: undefined;
  FarmProduceDetails: undefined;
  MyAds: undefined;
  AboutUs: undefined;
  ContactUs: undefined;
  Messages: undefined;
  Notifications: undefined;
  HelpAndSupport: undefined;
  TermsAndConditions: undefined;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<RootStackParamList, T>,
    DrawerScreenPropsType<keyof DrawerParamList>
  >;
