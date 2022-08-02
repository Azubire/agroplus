import React from "react";
import {
  VStack,
  Box,
  AspectRatio,
  HStack,
  Heading,
  useTheme,
  Image,
  Button,
} from "native-base";
import colors from "native-base/lib/typescript/theme/base/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { AuthScreenProps } from "../../navigations/authStack/types";

const ScreenTwo = ({ navigation }: AuthScreenProps<"WelcomeTwo">) => {
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
              source={require("../../../assets/app_images/Welcome/screen2.png")}
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
                variant="solid"
                rounded="full"
                bg={colors.tertiary[700]}
              ></Button>
              <Button
                onPress={() => {
                  navigation.navigate("WelcomeThree");
                }}
                size="sm"
                variant="outline"
                rounded="full"
                bg={colors.gray[100]}
              ></Button>
            </HStack>
            <Heading size="lg" textAlign={"center"} fontWeight="semibold">
              Connect with Various Distributors To Your Produce To The Desired
              Market With Ease
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
            navigation.navigate("WelcomeThree");
          }}
        >
          Next
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

export default ScreenTwo;
