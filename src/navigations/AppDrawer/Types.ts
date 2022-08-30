import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import { DrawerScreenProps } from "@react-navigation/drawer";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
  RouteProp,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../AppStack/types";
import { TabParamList } from "../appTabs/types";
import { WelcomeStackParamList } from "../Welcome/types";

export type DrawerParamList = {
  Root: NavigatorScreenParams<RootStackParamList>;
  WelcomeStack: NavigatorScreenParams<WelcomeStackParamList>;
  Welcome: undefined;
  ScreenOne: undefined;
  ScreenTwo: undefined;
  ScreenThree: undefined;
};

export type DrawerScreenPropsType<T extends keyof DrawerParamList> =
  DrawerScreenProps<DrawerParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends DrawerParamList {}
  }
}
