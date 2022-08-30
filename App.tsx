import { StatusBar } from "expo-status-bar";
//navigatonContainer
import { NavigationContainer } from "@react-navigation/native";

import { NativeBaseProvider, extendTheme } from "native-base";

import { Provider as ReduxProvider, useSelector } from "react-redux";
import store from "./src/store";
import AppDrawer from "./src/navigations/AppDrawer";
import AuthNavigationStack from "./src/navigations/authStack/AuthNavigationStack";
// import { getUser } from "./src/store/features/userSlice";
import { useAppSelector } from "./src/hooks/reduxHooks";
import Index from "./src/App";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <NativeBaseProvider>
        <Index />
      </NativeBaseProvider>
    </ReduxProvider>
  );
}
