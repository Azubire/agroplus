import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppDrawer from "./navigations/AppDrawer";
import AuthNavigationStack from "./navigations/authStack/AuthNavigationStack";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import WelcomeStack from "./navigations/Welcome/WelcomeStack";
import * as secureStore from "expo-secure-store";
import { getStarted } from "./store/features/userSlice";
import {
  Actionsheet,
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Text,
} from "native-base";
import { dismissCart, getCart } from "./store/features/cartSlice";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Index = () => {
  const dispatch = useAppDispatch();
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
  const { isOpen } = useAppSelector(getCart);
  const state = useAppSelector(getCart);
  console.log("redux", state.items);
  return (
    <NavigationContainer>
      {/* {showGetStarted ? <WelcomeStack /> : <AppDrawer />} */}
      <AppDrawer />
      <Actionsheet isOpen={isOpen} onClose={() => dispatch(dismissCart())}>
        <Actionsheet.Content>
          <Heading>Total Price: Ghc. {state.totalItemPrice}</Heading>
          {state.items.length > 0 ? (
            <Box w="full" mt={6}>
              <HStack
                mb={2}
                justifyContent="space-between"
                alignItems="center"
                space={1}
              >
                <Text textAlign="center" flex={0.5} bold>
                  #
                </Text>
                <Text textAlign="center" flex={0.5} bold>
                  Image
                </Text>
                <Text textAlign="center" flex={2} bold>
                  Title
                </Text>
                <Text textAlign="center" flex={1} bold>
                  Quantity
                </Text>
                <Text textAlign="center" flex={1} bold>
                  Price
                </Text>
              </HStack>
              {state.items.map((item, index) => (
                <HStack
                  key={index}
                  justifyContent="space-between"
                  alignItems="center"
                  space={1}
                >
                  <Text textAlign="center" flex={0.5}>
                    {index + 1}
                  </Text>
                  <Box flex={0.5}>
                    <Image
                      source={item.img}
                      style={{ width: 30, height: 30 }}
                      resizeMode="cover"
                    />
                  </Box>
                  <Text textAlign="center" flex={2} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text textAlign="center" flex={1}>
                    {item.quantity}
                  </Text>
                  <Text textAlign="center" flex={1}>
                    {"Ghc. " + item.price * item.quantity}
                  </Text>
                </HStack>
              ))}
              <HStack justifyContent="space-between" mt={6}>
                <Button
                  leftIcon={<Icon as={<Ionicons name="chevron-back" />} />}
                >
                  continue shoppping
                </Button>
                <Button
                  rightIcon={<Icon as={<Ionicons name="chevron-forward" />} />}
                  variant="outline"
                  colorScheme="success"
                >
                  checkout
                </Button>
              </HStack>
            </Box>
          ) : (
            <Text>No Cart Items</Text>
          )}
        </Actionsheet.Content>
      </Actionsheet>
    </NavigationContainer>
  );
};

export default Index;
