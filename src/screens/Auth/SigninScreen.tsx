import { View, Image } from "react-native";
import React from "react";

import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  HStack,
  Icon,
  Input,
  ScrollView,
  StatusBar,
  Text,
  useTheme,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import { AuthScreenProps } from "../../navigations/authStack/types";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { login } from "../../store/features/userSlice";
import CustomStatusBar from "../../components/CustomStatusBar";
import { Ionicons } from "@expo/vector-icons";

const SigninScreen: React.FC<AuthScreenProps<"Signin">> = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { colors } = useTheme();

  return (
    <ScrollView flex={1}>
      <CustomStatusBar style="light" />
      <VStack>
        {/* header  */}
        <HStack justifyContent="center" alignItems="center">
          <Image
            source={require("../../../assets/app_images/logo.png")}
            resizeMode="contain"
            style={{ height: 90, width: 90 }}
          />
          <HStack>
            <Text fontSize="3xl" bold style={{ color: colors.tertiary[700] }}>
              Agro
            </Text>
            <Text
              fontSize="3xl"
              bold
              style={{ marginLeft: 10, color: colors.danger[800] }}
            >
              Plus
            </Text>
          </HStack>
        </HStack>
        <Text textAlign="center">Log into your account</Text>
        {/* form */}
        <VStack px={6} space={6} mt={6}>
          <FormControl isInvalid={false}>
            <Input
              variant="filled"
              size="lg"
              InputLeftElement={
                <Icon size={21} ml={3} as={<Ionicons name="mail" />} />
              }
              bgColor={colors.gray[300]}
              placeholder="Enter password"
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Try different from previous passwords.
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={false}>
            <Input
              secureTextEntry
              variant="filled"
              size="lg"
              InputLeftElement={
                <Icon size={21} ml={3} as={<Ionicons name="lock-closed" />} />
              }
              InputRightElement={
                <Icon size={21} mr={3} as={<Ionicons name="eye" />} />
              }
              bgColor={colors.gray[300]}
              placeholder="Enter password"
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Try different from previous passwords.
            </FormControl.ErrorMessage>
          </FormControl>
          <Checkbox
            // shadow={2}
            colorScheme="tertiary"
            value="test"
            accessibilityLabel="Keep me signed in"
            defaultIsChecked
          >
            Keep me signed in
          </Checkbox>

          <Button
            colorScheme="tertiary"
            rightIcon={<Icon as={<Ionicons name="chevron-forward" />} />}
          >
            Sign in
          </Button>
          <Text color="tertiary.500" textAlign="center">
            Forgot password?
          </Text>

          <HStack justifyContent={"center"} alignItems="center">
            <Divider flex={1} thickness={1} bg={colors.dark[300]} />
            <Text flex={1} textAlign="center">
              or signin with
            </Text>
            <Divider flex={1} thickness={1} bg={colors.dark[300]} />
          </HStack>
          <HStack justifyContent="space-evenly" space={1}>
            <Button
              flex={1}
              variant="outline"
              leftIcon={<Icon as={<Ionicons name="logo-google" />} />}
            >
              Google
            </Button>
            <Button
              flex={1}
              variant="outline"
              leftIcon={<Icon as={<Ionicons name="logo-apple" />} />}
            >
              Apple
            </Button>
            <Button
              flex={1}
              variant="outline"
              leftIcon={<Icon as={<Ionicons name="logo-facebook" />} />}
            >
              Facebook
            </Button>
          </HStack>
        </VStack>
        <HStack justifyContent="center" alignItems="center" my={6}>
          <Text>Don't have an acccount?</Text>
          <Button
            variant="ghost"
            onPress={() => {
              navigation.navigate("Signup");
            }}
          >
            Signup
          </Button>
        </HStack>
      </VStack>
    </ScrollView>
  );
};

export default SigninScreen;
