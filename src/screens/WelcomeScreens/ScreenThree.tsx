import { View, Text } from "react-native";
import React from "react";
import {
  AspectRatio,
  Box,
  Button,
  Heading,
  HStack,
  Image,
  useTheme,
  VStack,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import { AuthScreenProps } from "../../navigations/authStack/types";

const ScreenThree = ({ navigation }: AuthScreenProps<"WelcomeThree">) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <VStack
        justifyContent="space-between"
        alignItems="center"
        flex={1}
        my={31}
        px={14}
      >
        <Box>
          <AspectRatio width="100%" ratio={4 / 3}>
            <Image
              source={require("../../../assets/app_images/Welcome/screen3.png")}
              width="full"
              resizeMode="contain"
              height="xs"
              alt="farmer"
            />
          </AspectRatio>
        </Box>
        <Box>
          <VStack>
            <HStack
              justifyContent={"space-evenly"}
              alignItems="center"
              alignSelf={"center"}
              width={24}
              mb={6}
            >
              <Button
                variant="outline"
                rounded="full"
                bg={colors.gray[100]}
                size="sm"
                onPress={() => {
                  navigation.navigate("WelcomeOne");
                }}
              ></Button>
              <Button
                size="sm"
                variant="outline"
                rounded="full"
                bg={colors.gray[100]}
              ></Button>
              <Button
                onPress={() => {
                  navigation.navigate("WelcomeThree");
                }}
                size="sm"
                rounded="full"
                bg={colors.tertiary[700]}
              ></Button>
            </HStack>
            <Heading size="lg" textAlign={"center"} fontWeight="semibold">
              Get Daily Updates Of The Weather And News Concerning Agriculture
            </Heading>
          </VStack>
        </Box>
        <Button
          width="80%"
          variant="solid"
          bg={colors.tertiary[700]}
          endIcon={
            <Ionicons name="arrow-forward" size={20} color={colors.white} />
          }
          onPress={() => {
            navigation.navigate("Signin");
          }}
        >
          Get Started
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

export default ScreenThree;
