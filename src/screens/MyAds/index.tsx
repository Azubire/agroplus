import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomStatusBar from "../../components/CustomStatusBar";
import { RootStackScreenProps } from "../../navigations/AppStack/types";
import {
  Box,
  Button,
  Card,
  HStack,
  Icon,
  List,
  Text,
  useTheme,
} from "native-base";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getUser } from "../../store/features/userSlice";
import AccessDenied from "../../components/AccessDenied";
import {
  getOrderHistory,
  getOrderHistoryState,
} from "../../store/features/orderHistorySlice";
import { Ionicons } from "@expo/vector-icons";

const AdHistory = ({ navigation }: RootStackScreenProps<"MyAds">) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getUser);
  const { data: orders } = useAppSelector(getOrderHistoryState);
  const state = useAppSelector(getOrderHistoryState);

  const fetchHistory = async () => {
    try {
      const data = await dispatch(getOrderHistory(user.userId)).unwrap();
      console.log("response", data);
      console.log("status", state.status);
    } catch (error) {
      console.log("error", error);
    }
  };

  React.useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <>
      <CustomStatusBar style="light" />
      {user.userToken ? (
        Boolean(state.status === "loading" || state.status == "idle") ? (
          <ActivityIndicator size="large" />
        ) : (
          <Box borderWidth={1} flex={1}>
            <FlatList
              data={orders}
              keyExtractor={(item) => item.id.toString()}
              ListHeaderComponent={() => (
                <Box mx={2} my={6}>
                  <HStack justifyContent={"center"} alignItems="center">
                    <Text fontSize="lg" textAlign="center" bold>
                      Recent orders
                    </Text>
                  </HStack>
                  <HStack mt={6}>
                    <Text flex={2} bold numberOfLines={2}>
                      Order No
                    </Text>

                    <Text flex={1} bold numberOfLines={1}>
                      Total
                    </Text>

                    <Text flex={1} bold numberOfLines={2}>
                      Payment Status
                    </Text>
                    <Text flex={1} bold numberOfLines={2}>
                      Order Status
                    </Text>
                  </HStack>
                </Box>
              )}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("OrderDetails", { id: item.id });
                  }}
                >
                  <Card shadow={1} mb={1}>
                    <HStack space={1} alignItems="center">
                      <Text flex={2} numberOfLines={2} color="info.500">
                        {item.orderCode}
                      </Text>

                      <Text flex={1} numberOfLines={1}>
                        {"Ghc. " + item.grandTotal}
                      </Text>

                      <Text
                        flex={1}
                        color={
                          item.paymentStatus === "paid"
                            ? "success.700"
                            : "danger.700"
                        }
                        numberOfLines={1}
                      >
                        {item.paymentStatus}
                      </Text>
                      <Text flex={1} numberOfLines={1}>
                        {item.deliveryStatus}
                      </Text>
                    </HStack>
                  </Card>
                </TouchableOpacity>
              )}
            />
          </Box>
        )
      ) : (
        <AccessDenied style="light" />
      )}
    </>
  );
};

export default AdHistory;
