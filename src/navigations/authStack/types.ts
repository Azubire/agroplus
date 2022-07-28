import { NavigationProp, RouteProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AuthStackParamList = {
  Signin: undefined;
  Signup: undefined;
};

// export type AuthScreenProps<T extends keyof AuthStackParamList> = {
//   navigation: NavigationProp<AuthStackParamList, T>;
//   route: RouteProp<AuthStackParamList, T>;
// };

export type AuthScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;
