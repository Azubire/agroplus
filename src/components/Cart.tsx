import { Image, View } from "react-native";
import React from "react";
import {
  Actionsheet,
  Button,
  Box,
  Heading,
  HStack,
  Icon,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  decreaseQuantity,
  dismissCart,
  getCart,
  increaseQuantity,
  removeFromCart,
} from "../store/features/cartSlice";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Cart = () => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const { showGetStarted } = useAppSelector((state) => state.User);
  const { isOpen } = useAppSelector(getCart);
  const state = useAppSelector(getCart);

  return (
    <View>
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
                  Img
                </Text>
                <Text textAlign="center" flex={2} bold>
                  Product
                </Text>
                <Text textAlign="center" flex={1} bold>
                  Qty
                </Text>
                <Text textAlign="center" flex={1} bold>
                  Remove
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
                  <VStack flex={2}>
                    <Text numberOfLines={1} fontSize="xs">
                      {item.title}
                    </Text>
                    <Text fontSize="xs">
                      {"Ghc. " + item.price * item.quantity}
                    </Text>
                  </VStack>

                  <Text textAlign="center" flex={1}>
                    <HStack>
                      <Button
                        rounded="full"
                        w={2}
                        h={2}
                        disabled={Boolean(item.quantity <= 0)}
                        onPress={() => dispatch(decreaseQuantity(item.id))}
                      >
                        <Icon
                          alignSelf="center"
                          color={colors.light[100]}
                          as={<Ionicons name="remove" size={5} />}
                        />
                      </Button>
                      <Text mx={1}>{item.quantity}</Text>
                      <Button
                        rounded="full"
                        w={2}
                        h={2}
                        onPress={() => dispatch(increaseQuantity(item.id))}
                      >
                        <Icon
                          alignSelf="center"
                          color={colors.light[100]}
                          as={<Ionicons name="add" size={5} />}
                        />
                      </Button>
                    </HStack>
                  </Text>
                  <Box flex={1}>
                    <Button
                      rounded="full"
                      w={2}
                      h={2}
                      colorScheme="#fff"
                      onPress={() => {
                        return dispatch(removeFromCart(item.id));
                      }}
                    >
                      <Icon
                        color={colors.danger[700]}
                        as={<Ionicons name="close" size={5} />}
                      />
                    </Button>
                  </Box>
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
                  onPress={() => {
                    dispatch(dismissCart());
                    navigation.navigate("Root", { screen: "Cart" });
                  }}
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
    </View>
  );
};

export default Cart;
