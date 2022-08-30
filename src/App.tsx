import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppDrawer from "./navigations/AppDrawer";
import AuthNavigationStack from "./navigations/authStack/AuthNavigationStack";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import WelcomeStack from "./navigations/Welcome/WelcomeStack";
import * as secureStore from "expo-secure-store";
import { getStarted } from "./store/features/userSlice";

const Index = () => {
  // const [showWelcomeStack, setShowWelcomeStack] = React.useState<
  //   boolean | null
  // >();
  // const dispatch = useAppDispatch();

  // React.useEffect(() => {
  //   const getItem = async () => {
  //     const showGetStarted = await secureStore.getItemAsync("showGetStarted");
  //     console.log("localSorage useffect", showGetStarted);
  //     if (showGetStarted == "true") {
  //       dispatch(getStarted(true));
  //     } else if (showGetStarted == "false") {
  //       dispatch(getStarted(false));
  //     }
  //   };
  //   getItem();
  // }, []);

  const { showGetStarted } = useAppSelector((state) => state.User);
  // console.log("redux", showGetStarted);
  return (
    <NavigationContainer>
      {/* {showGetStarted ? <WelcomeStack /> : <AppDrawer />} */}

      <AppDrawer />
    </NavigationContainer>
  );
};

export default Index;
