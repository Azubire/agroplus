import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DrawerParamList, DrawerScreenPropsType } from "../AppDrawer/Types";

export type WelcomeStackParamList = {
  Welcome: undefined;
  ScreenOne: undefined;
  ScreenTwo: undefined;
  ScreenThree: undefined;
};

export type WelcomeScreenProps<T extends keyof WelcomeStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<WelcomeStackParamList, T>,
    DrawerScreenPropsType<keyof DrawerParamList>
  >;
