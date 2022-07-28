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

export type DrawerParamList = {
  Root: NavigatorScreenParams<RootStackParamList>;
};

export type DrawerScreenPropsType<T extends keyof DrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, T>,
    CompositeScreenProps<
      NativeStackScreenProps<RootStackParamList>,
      BottomTabScreenProps<TabParamList>
    >
  >;
