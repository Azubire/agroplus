import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomStatusBar from "../../components/CustomStatusBar";
import {
  ArrowBackIcon,
  Box,
  Button,
  Card,
  FormControl,
  HStack,
  Icon,
  Image,
  Input,
  Pressable,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { RootStackScreenProps } from "../../navigations/AppStack/types";
import {
  getOrderDetails,
  IOrderDetails,
} from "../../store/features/orderHistorySlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "../../hooks/reduxHooks";

const OrderDetails = ({
  navigation,
  route,
}: RootStackScreenProps<"OrderDetails">) => {
  const [order, setOrder] = React.useState<{
    id: number;
    grandTotal: number;
    paymentStatus: "paid" | "unpaid";
    viewed: number;
    deliveryStatus: "delivered" | "pending" | "rejected";
    orderCode: string;
    userId: number;
    createdAt: string;
    OrderDetails: Array<IOrderDetails>;
  }>();
  const [loading, setLoading] = React.useState(true);
  const { id } = route.params;
  const { colors } = useTheme();
  const orders = useAppSelector(getOrderDetails(id));
  React.useEffect(() => {
    setOrder(orders);
    setLoading(false);
  }, [id]);

  return (
    <ScrollView>
      <CustomStatusBar style="light" />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Box height={160} bgColor="info.500" px={4}>
            <Text fontSize="lg" bold color="lightText">
              {"Order # " + order?.orderCode}
            </Text>
            <Text fontSize="xl" bold color="lightText">
              {"Total Cost : Ghc. " + order?.grandTotal}
            </Text>
            <Text fontSize="xl" bold color="lightText">
              {"No of Products " + order?.OrderDetails.length}
            </Text>
            <Text bold color="lightText">
              Date: {order?.createdAt}
            </Text>
            <HStack
              justifyContent="space-between"
              position="absolute"
              mx={2}
              bottom={-40}
              space={2}
              right={0}
              left={0}
            >
              <Card w={150} bg="light.100">
                <VStack alignItems="center" space={2}>
                  <Icon
                    color={colors.rose[500]}
                    size={22}
                    as={<Ionicons name="cash" />}
                  />
                  <Text
                    bold
                    color={
                      order?.paymentStatus === "paid"
                        ? "success.700"
                        : "danger.700"
                    }
                  >
                    {order?.paymentStatus.toUpperCase()}
                  </Text>
                </VStack>
              </Card>
              <Card w={150} bg="light.100">
                <VStack alignItems="center" space={2}>
                  <Icon
                    color={colors.rose[500]}
                    size={22}
                    as={<Ionicons name="car" />}
                  />
                  <Text bold>{order?.deliveryStatus.toUpperCase()}</Text>
                </VStack>
              </Card>
            </HStack>
          </Box>
          <Box mt={16}>
            {/* <Text>Date: {order.}</Text> */}
            <Box>
              {/* <HStack>
            <Text bold flex={1}>
              #
            </Text>
            <Text bold flex={3} numberOfLines={2}>
              Title
            </Text>
            <Text bold flex={1}>
              Price
            </Text>
            <Text bold flex={1}>
              Qty
            </Text>
          </HStack> */}
              {order?.OrderDetails.map((order, index) => (
                <Card shadow={1} key={index} mt={3} mb={3} mx={2}>
                  <Image
                    height={200}
                    width="full"
                    resizeMode="cover"
                    alt={order.Ad.title}
                    source={{
                      uri: `http://192.168.43.35:3001/images/ads/${order.Ad.img}`,
                    }}
                  />
                  <Box mt={6}>
                    <Button
                      colorScheme="danger"
                      mb={6}
                      onPress={() => {
                        navigation.navigate("FarmProduceDetails", {
                          id: order.Ad.id.toString(),
                        });
                      }}
                    >
                      View Product
                    </Button>
                    <FormControl>
                      <FormControl.Label>Product Title</FormControl.Label>
                      <Input
                        editable={false}
                        size="lg"
                        variant="underlined"
                        defaultValue={order.Ad.title}
                      />
                    </FormControl>
                    <FormControl>
                      <FormControl.Label>Product Price</FormControl.Label>
                      <Input
                        editable={false}
                        size="lg"
                        variant="underlined"
                        defaultValue={order.Ad.price.toString()}
                      />
                    </FormControl>
                    <FormControl>
                      <FormControl.Label>Product Quantity</FormControl.Label>
                      <Input
                        editable={false}
                        size="lg"
                        variant="underlined"
                        defaultValue={order.qty.toString()}
                      />
                    </FormControl>
                    <FormControl>
                      <FormControl.Label>Product Category</FormControl.Label>
                      <Input
                        editable={false}
                        size="lg"
                        variant="underlined"
                        defaultValue={order.Ad.Category.name}
                      />
                    </FormControl>
                    <FormControl>
                      <FormControl.Label>Sold By</FormControl.Label>
                      <Input
                        editable={false}
                        size="lg"
                        variant="underlined"
                        defaultValue={order.Ad.User.fullname}
                      />
                    </FormControl>
                  </Box>
                </Card>
              ))}
            </Box>
          </Box>
        </>
      )}
    </ScrollView>
  );
};

export default OrderDetails;
