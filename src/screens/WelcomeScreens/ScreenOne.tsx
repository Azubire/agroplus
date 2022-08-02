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

const ScreenOne = ({ navigation }: AuthScreenProps<"WelcomeOne">) => {
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
              source={require("../../../assets/app_images/Welcome/screen1.png")}
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
                rounded="full"
                bg={colors.tertiary[700]}
                size="sm"
              ></Button>
              <Button
                onPress={() => {
                  navigation.navigate("WelcomeTwo");
                }}
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
                variant="outline"
                rounded="full"
                bg={colors.gray[100]}
              ></Button>
            </HStack>
            <Heading size="lg" textAlign={"center"} fontWeight="semibold">
              Agro Plus Aims To Bridge The Gab Between Farmers And Distributors
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
            navigation.navigate("WelcomeTwo");
          }}
        >
          Next
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

export default ScreenOne;
