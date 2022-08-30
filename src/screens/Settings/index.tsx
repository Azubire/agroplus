import { View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomStatusBar from "../../components/CustomStatusBar";
import {
  Avatar,
  Box,
  FormControl,
  HStack,
  Input,
  Text,
  useTheme,
  VStack,
} from "native-base";

const Settings = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView>
      <CustomStatusBar style="light" backgroundColor={colors.tertiary[700]} />
      <Box>
        <HStack space={3} justifyContent="center" bg="tertiary.700" py={6}>
          <VStack space={1}>
            <Text color={colors.lightText}>Username : Azubire</Text>
            <Text color={colors.lightText}>
              Account Type : <Text color={colors.green[500]}>Farmer</Text>
            </Text>
            <Text color={colors.lightText}>Account Balance : Ghc 2000.00</Text>
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
              defaultValue="Azubire Peter"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Email Address</FormControl.Label>
            <Input
              editable={false}
              size="lg"
              variant="underlined"
              defaultValue="azubirepeter@gmail.com"
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
