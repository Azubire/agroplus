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

const Settings = ({ navigation }: TabScreenProps<"Settings">) => {
  const { colors } = useTheme();

  const { user } = useAppSelector(getUser);
  return (
    <SafeAreaView>
      <CustomStatusBar style="light" backgroundColor={colors.tertiary[700]} />
      <Box bg="tertiary.700">
        <HStack space={3} justifyContent="space-evenly" py={6}>
          <VStack space={1}>
            <Text color={colors.lightText}>Username : {user.username}</Text>
            <Text color={colors.lightText}>
              Account Type : <Text color={colors.green[500]}>Farmer</Text>
            </Text>
            <Text color={colors.lightText}>
              Account Balance : Ghc {user.accountBalance}
            </Text>
            <Text color={colors.lightText}>Total Sales : 20</Text>
          </VStack>
          <Avatar
            size="xl"
            bg="amber.700"
            source={require("../../../assets/app_images/azubire.jpg")}
          >
            Az
          </Avatar>
        </HStack>
        <HStack justifyContent="space-evenly" alignItems="center" mb={3}>
          <Text color={colors.lightText}>
            To become a distributor, apply here
          </Text>
          <Button
            colorScheme="danger"
            w="1/3"
            onPress={() => {
              navigation.navigate("BecomeDistributor");
            }}
          >
            Apply
          </Button>
        </HStack>
      </Box>

      <Box px={6} mt={6}>
        <Text textAlign="center" fontSize="lg" bold mt={6} underline>
          Profile
        </Text>
        <VStack space={2} mt={6}>
          <FormControl>
            <FormControl.Label>Full Name</FormControl.Label>
            <Input
              editable={false}
              size="lg"
              variant="underlined"
              defaultValue={user.username}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Email Address</FormControl.Label>
            <Input
              editable={false}
              size="lg"
              variant="underlined"
              defaultValue={user.email}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Contact Number</FormControl.Label>
            <Input
              editable={false}
              size="lg"
              variant="underlined"
              defaultValue="+233242124312"
            />
          </FormControl>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default Settings;
