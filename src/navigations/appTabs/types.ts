import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { DrawerScreenProps } from "@react-navigation/drawer";
import {
  CompositeScreenProps,
  NavigationProp,
  RouteProp,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DrawerParamList } from "../AppDrawer/Types";
import { RootStackParamList } from "../AppStack/types";

export type TabParamList = {
  Home: undefined;
  Explore: undefined;
  UploadCrop: undefined;
  Search: undefined;
  Settings: undefined;
};

// export type TabScreenProps<T extends keyof TabParamList> = {
//   navigation: NavigationProp<TabParamList, T>;
//   route: RouteProp<TabParamList, T>;
// };

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  CompositeScreenProps<
    DrawerScreenProps<DrawerParamList>,
    NativeStackScreenProps<RootStackParamList>
  >
>;
