import { Image, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  Actionsheet,
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  List,
  Modal,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useSelector } from "react-redux";
import {
  clearCart,
  decreaseQuantity,
  dismissCart,
  getCart,
  increaseQuantity,
  removeFromCart,
} from "../../store/features/cartSlice";
import { RootStackScreenProps } from "../../navigations/AppStack/types";
import { getUser, updateAccountBalance } from "../../store/features/userSlice";
import AccessDenied from "../../components/AccessDenied";
import { getOrders, pay } from "../../store/features/orderSlice";

const Cart = ({ navigation }: RootStackScreenProps<"Cart">) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [confirmPayment, setConfirmPayment] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({
    show: false,
    error: false,
    message: "",
  });
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const state = useSelector(getCart);
  const user = useAppSelector(getUser);
  const order = useSelector(getOrders);
  // console.log(state.items);

  React.useEffect(() => {}, [order.error]);

  const [orderData, setOrderData] = React.useState({
    userId: user.user.userId,
    data: {
      items: state.items.map((item) => {
        const { img, title, ...rest } = item;
        return rest;
      }),
      paymentType: "",
      grandTotal: state.totalItemPrice,
    },
  });

  const handleConfirmPayment = async () => {
    setLoading(true);
    setConfirmPayment(false);

    // console.log(orderData);

    try {
      const data = await dispatch(
        pay({ userId: orderData.userId, data: orderData.data })
      ).unwrap();
      console.log("response", data);
      if (data.error) {
        setError({
          error: true,
          show: true,
          message: data.message,
        });
      } else {
        setError({
          error: false,
          show: true,
          message: data.message,
        });
        const balance = user.user.accountBalance - state.totalItemPrice;
        dispatch(updateAccountBalance(balance));
        dispatch(clearCart());
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {user.user.userToken ? (
        <>
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <Modal.Content>
              <Modal.Header>Choose Payment</Modal.Header>
              <Modal.Body>
                <TouchableOpacity>
                  <List.Item>Momo</List.Item>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setOrderData((prev) => ({
                      ...prev,
                      data: { ...prev.data, paymentType: "account" },
                    }));
                    setIsOpen(false);
                    setConfirmPayment(true);
                  }}
                >
                  <List.Item>Account</List.Item>
                </TouchableOpacity>
              </Modal.Body>
            </Modal.Content>
          </Modal>
          <Modal isOpen={confirmPayment}>
            <Modal.Content>
              <Modal.Header>Confirm Payment</Modal.Header>
              <Modal.Body>
                <Box>
                  <Text bold fontSize="lg">
                    Account Balance: Ghc. {user.user.accountBalance}
                  </Text>
                </Box>
                <Box>
                  <Text>
                    Are you sure you want to approve this transaction?
                  </Text>
                </Box>
              </Modal.Body>
              <Modal.Footer>
                <HStack space={3}>
                  <Button
                    colorScheme="error"
                    leftIcon={
                      <Icon as={<Ionicons name="close" color="#fff" />} />
                    }
                    onPress={() => setConfirmPayment(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    isLoading={Boolean(order.status === "loading")}
                    colorScheme="success"
                    leftIcon={
                      <Icon as={<Ionicons name="close" color="#fff" />} />
                    }
                    onPress={handleConfirmPayment}
                  >
                    Confirm
                  </Button>
                </HStack>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
          {/* payment response */}
          <Modal isOpen={error.show}>
            <Modal.Content>
              <Modal.Header>
                {error.error ? "Failed Transaction" : "Transaction Complete"}
              </Modal.Header>
              <Modal.Body>
                <Box alignSelf="center">
                  <Ionicons
                    name={
                      error.error
                        ? "close-circle-outline"
                        : "checkmark-circle-outline"
                    }
                    color={
                      error.error ? colors.danger[700] : colors.success[700]
                    }
                    size={80}
                  />
                </Box>
                <Box>
                  <Text fontSize="lg" textAlign="center">
                    {error.message}
                  </Text>
                </Box>
              </Modal.Body>
              <Modal.Footer>
                <HStack space={3}>
                  <Button
                    // isLoading={loading}
                    colorScheme="info"
                    leftIcon={
                      <Icon as={<Ionicons name="close" color="#fff" />} />
                    }
                    onPress={() =>
                      setError((prev) => ({ ...prev, show: false }))
                    }
                  >
                    Close
                  </Button>
                </HStack>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
          <Box mx={2} mt={2}>
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
                        source={{
                          uri: `http://192.168.43.35:3001/images/ads/${item.img}`,
                        }}
                        style={{ width: 30, height: 30 }}
                        resizeMode="cover"
                      />
                    </Box>
                    <VStack flex={2} mt={3}>
                      <Text textAlign="center" numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text>{"Ghc. " + item.price * item.qty}</Text>
                    </VStack>

                    <Text textAlign="center" flex={1}>
                      <HStack>
                        <Button
                          rounded="full"
                          w={2}
                          h={2}
                          disabled={Boolean(item.qty <= 0)}
                          onPress={() =>
                            dispatch(decreaseQuantity(item.productId))
                          }
                        >
                          <Icon
                            alignSelf="center"
                            color={colors.light[100]}
                            as={<Ionicons name="remove" size={5} />}
                          />
                        </Button>
                        <Text mx={1}>{item.productId}</Text>
                        <Button
                          rounded="full"
                          w={2}
                          h={2}
                          onPress={() =>
                            dispatch(increaseQuantity(item.productId))
                          }
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
                        colorScheme="#ffff"
                        onPress={() => {
                          console.log("this");
                          return dispatch(removeFromCart(item.productId));
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
                <Box mt={6}>
                  <Text textAlign="right" bold>
                    Total Price: Ghc. {state.totalItemPrice}
                  </Text>
                </Box>
                <HStack justifyContent="space-between" mt={6}>
                  <Button
                    isLoading={Boolean(order.status === "loading")}
                    alignSelf="flex-end"
                    rightIcon={
                      <Icon as={<Ionicons name="chevron-forward" />} />
                    }
                    variant="outline"
                    colorScheme="success"
                    onPress={() => setIsOpen(true)}
                  >
                    Pay Now
                  </Button>
                </HStack>
              </Box>
            ) : (
              <Text>No Cart Items</Text>
            )}
          </Box>
        </>
      ) : (
        <AccessDenied style="light" />
      )}
    </View>
  );
};

export default Cart;
