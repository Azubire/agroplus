import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DrawerParamList, DrawerScreenPropsType } from "../AppDrawer/Types";
import { TabParamList } from "../appTabs/types";
import { AuthStackParamList } from "../authStack/types";

export type RootStackParamList = {
  // WelcomeStack: NavigatorScreenParams<WelcomeStackParamList>;
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
