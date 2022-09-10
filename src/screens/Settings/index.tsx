import { View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomStatusBar from "../../components/CustomStatusBar";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { useAppSelector } from "../../hooks/reduxHooks";
import { getUser } from "../../store/features/userSlice";
import { screenParamList } from "../../navigations/SettingStack/types";
import { TabScreenProps } from "../../navigations/appTabs/types";
import AccessDenied from "../../components/AccessDenied";
import Distributor from "../../components/Distributor";
import Farmer from "../../components/Farmer";

const Settings = ({ navigation }: TabScreenProps<"Settings">) => {
  const { colors } = useTheme();

  const user = useAppSelector(getUser);

  React.useEffect(() => {}, [user.isDistributor]);
  console.log("------->>>>>||||", user);
  return (
    <SafeAreaView>
      {user.user.userToken ? (
        <>
          <CustomStatusBar
            style="light"
            backgroundColor={colors.tertiary[700]}
          />
          {user.isDistributor ? <Distributor /> : <Farmer />}
        </>
      ) : (
        <AccessDenied style="dark" />
      )}
    </SafeAreaView>
  );
};

export default Settings;
