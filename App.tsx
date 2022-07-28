import { StatusBar } from "expo-status-bar";
//navigatonContainer
import { NavigationContainer } from "@react-navigation/native";

import { NativeBaseProvider, extendTheme } from "native-base";

import { Provider as ReduxProvider } from "react-redux";
import store from "./src/store";
import AppDrawer from "./src/navigations/AppDrawer";
import AuthNavigationStack from "./src/navigations/authStack/AuthNavigationStack";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          {/* <AuthNavigationStack /> */}
          <AppDrawer />
        </NavigationContainer>
      </NativeBaseProvider>
    </ReduxProvider>
  );
}
