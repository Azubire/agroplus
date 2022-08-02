import {
  CompositeScreenProps,
  NavigationProp,
  RouteProp,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DrawerParamList, DrawerScreenPropsType } from "../AppDrawer/Types";
import { RootStackParamList, RootStackScreenProps } from "../AppStack/types";

export type AuthStackParamList = {
  Welcome: undefined;
  WelcomeOne: undefined;
  WelcomeTwo: undefined;
  WelcomeThree: undefined;
  Signin: undefined;
  Signup: undefined;
};

export type AuthScreenProps<T extends keyof AuthStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<AuthStackParamList, T>,
    CompositeScreenProps<
      RootStackScreenProps<keyof RootStackParamList>,
      DrawerScreenPropsType<keyof DrawerParamList>
    >
  >;
