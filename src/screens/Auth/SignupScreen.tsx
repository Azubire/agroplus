import "fast-text-encoding";
import { View, Image } from "react-native";
import React from "react";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  HStack,
  Icon,
  Input,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  useTheme,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import { AuthScreenProps } from "../../navigations/authStack/types";
import CustomStatusBar from "../../components/CustomStatusBar";
import { Ionicons } from "@expo/vector-icons";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getUser, signup } from "../../store/features/userSlice";

interface IFormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = Joi.object<any, false, IFormData>({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref("password"),
});

const SignupScreen: React.FC<AuthScreenProps<"Signup">> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const state = useAppSelector(getUser);

  //react-hook-form
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful, isValid, isDirty },
  } = useForm<IFormData>({
    defaultValues: {},
    resolver: joiResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormData> = async (formData) => {
    console.log("valid data -------->", formData);
    const { confirmPassword, ...rest } = formData;
    try {
      const data = await dispatch(signup(rest)).unwrap();
      console.log("data", data);
      reset();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <ScrollView flex={1}>
      <CustomStatusBar style="light" />
      <VStack>
        <Modal isOpen={Boolean(state.status === "success")}>
          <Modal.Content>
            <Modal.Body>
              <Icon
                alignSelf="center"
                size={90}
                color={colors.success[700]}
                as={<Ionicons name="checkmark" />}
              />
              <Text fontSize="lg" textAlign="center">
                Registration Successfull
              </Text>
            </Modal.Body>
            <Modal.Footer>
              <Button
                colorScheme="warning"
                onPress={() => {
                  navigation.goBack();
                }}
              >
                Login To Continue
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
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
        <Text textAlign="center">Create your account</Text>
        {/* form */}
        <VStack px={6} space={6} mt={6}>
          <HStack space={2}>
            <FormControl flex={1} isInvalid={Boolean(errors.firstname)}>
              <Controller
                name="firstname"
                control={control}
                defaultValue=""
                render={({ field: { onChange } }) => (
                  <>
                    <Input
                      onChangeText={onChange}
                      variant="filled"
                      size="lg"
                      InputLeftElement={
                        <Icon
                          size={21}
                          ml={3}
                          as={<Ionicons name="person" />}
                        />
                      }
                      bgColor={colors.gray[300]}
                      placeholder="First name"
                    />
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {errors.firstname?.message}
                    </FormControl.ErrorMessage>
                  </>
                )}
              />
            </FormControl>
            <FormControl flex={1} isInvalid={Boolean(errors.lastname)}>
              <Controller
                name="lastname"
                control={control}
                defaultValue=""
                render={({ field: { onChange } }) => (
                  <>
                    <Input
                      onChangeText={onChange}
                      variant="filled"
                      size="lg"
                      InputLeftElement={
                        <Icon
                          size={21}
                          ml={3}
                          as={<Ionicons name="person" />}
                        />
                      }
                      bgColor={colors.gray[300]}
                      placeholder="Last name"
                    />
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {errors.lastname?.message}
                    </FormControl.ErrorMessage>
                  </>
                )}
              />
            </FormControl>
          </HStack>
          <FormControl isInvalid={Boolean(errors.email)}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field: { onChange } }) => (
                <>
                  <Input
                    onChangeText={onChange}
                    variant="filled"
                    size="lg"
                    InputLeftElement={
                      <Icon size={21} ml={3} as={<Ionicons name="mail" />} />
                    }
                    bgColor={colors.gray[300]}
                    placeholder="Enter email"
                  />
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    {errors.email?.message}
                  </FormControl.ErrorMessage>
                </>
              )}
            />
          </FormControl>
          <FormControl isInvalid={Boolean(errors.password)}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field: { onChange } }) => (
                <>
                  <Input
                    onChangeText={onChange}
                    secureTextEntry
                    variant="filled"
                    size="lg"
                    InputLeftElement={
                      <Icon
                        size={21}
                        ml={3}
                        as={<Ionicons name="lock-closed" />}
                      />
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
                    {errors.password?.message}
                  </FormControl.ErrorMessage>
                </>
              )}
            />
          </FormControl>
          <FormControl isInvalid={Boolean(errors.confirmPassword)}>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              render={({ field: { onChange } }) => (
                <>
                  <Input
                    onChangeText={onChange}
                    secureTextEntry
                    variant="filled"
                    size="lg"
                    InputLeftElement={
                      <Icon
                        size={21}
                        ml={3}
                        as={<Ionicons name="lock-closed" />}
                      />
                    }
                    InputRightElement={
                      <Icon size={21} mr={3} as={<Ionicons name="eye" />} />
                    }
                    bgColor={colors.gray[300]}
                    placeholder="Confirm password"
                  />
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    {errors.confirmPassword?.message}
                  </FormControl.ErrorMessage>
                </>
              )}
            />
          </FormControl>
          <Checkbox
            // shadow={2}
            colorScheme="tertiary"
            value="test"
            accessibilityLabel="Keep me signed in"
            defaultIsChecked
          >
            I accept all the terms and conditions
          </Checkbox>

          <Button
            isLoading={Boolean(state.status === "loading")}
            colorScheme="tertiary"
            rightIcon={<Icon as={<Ionicons name="chevron-forward" />} />}
            onPress={handleSubmit(onSubmit)}
          >
            Sign up
          </Button>

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
              navigation.navigate("Signin");
            }}
          >
            Signin
          </Button>
        </HStack>
      </VStack>
    </ScrollView>
  );
};

export default SignupScreen;
