import { View, Text } from "react-native";
import React from "react";
import Center from "../../components/Center";
import {
  AspectRatio,
  Box,
  Button,
  Heading,
  Image,
  useTheme,
  VStack,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthScreenProps } from "../../navigations/authStack/types";
import { WelcomeScreenProps } from "../../navigations/Welcome/types";

const WelcomeScreen = ({ navigation }: WelcomeScreenProps<"Welcome">) => {
  const { colors } = useTheme();

  const [loading, setloading] = React.useState(false);

  // React.useEffect(() => {
  //   setloading(true);
  //   return () => {
  //     setloading(false);
  //   };
  // }, [loading]);

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
              source={require("../../../assets/app_images/Welcome/farmer.jpg")}
              width="full"
              resizeMode="contain"
              height="xs"
              alt="farmer"
            />
          </AspectRatio>
        </Box>
        <Box>
          <VStack>
            <Heading textAlign="left" size="2xl" pl={8}>
              <Heading color={colors.tertiary[700]} size="2xl">
                Welcome{" "}
              </Heading>
              To{" "}
            </Heading>
            <Heading size="2xl" textAlign={"right"} mb={5} pr={8}>
              Agro{" "}
              <Heading color={colors.tertiary[700]} size="2xl">
                {" "}
                Plus
              </Heading>
            </Heading>
            <Heading size="sm" textAlign={"center"} fontWeight="semibold">
              Agro Plus is an app to help farmers ensure greater profitability
              throught direct farmer-to-supplier and farmer-to-farmer
              communication
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
            // setloading(true);
            navigation.navigate("ScreenOne");
          }}
        >
          Continue
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
