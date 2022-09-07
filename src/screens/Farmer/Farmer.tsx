import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CustomStatusBar from "../../components/CustomStatusBar";
import {
  AspectRatio,
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { AirbnbRating } from "react-native-ratings";
import { getFarmerState, IFarmer } from "../../store/features/famerSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootStackScreenProps } from "../../navigations/AppStack/types";
import { Ionicons } from "@expo/vector-icons";
import { addToCart } from "../../store/features/cartSlice";

const Farmer = ({ navigation }: RootStackScreenProps<"FarmProduce">) => {
  const [loading, setLoading] = React.useState(true);
  const [farmers, setFarmers] = React.useState<IFarmer[]>([]);

  const dispatch = useAppDispatch();
  const farmersState = useAppSelector(getFarmerState);

  const { colors } = useTheme();
  React.useEffect(() => {
    setFarmers(farmersState.data.farmer);
    setLoading(false);
  }, []);

  return (
    <View>
      <CustomStatusBar style="light" />
      <Box my={8}></Box>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          horizontal={false}
          data={farmers}
          // numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{ flex: 1, marginBottom: 10 }}
              key={index}
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate("FarmProduceDetails", {
                  id: item.id.toString(),
                });
              }}
            >
              <VStack borderWidth={1} borderColor="gray.300" mx={1}>
                {/* card image  */}
                <Box>
                  <AspectRatio w="100%" ratio={4 / 3}>
                    <Image
                      source={{
                        uri: `http://192.168.43.35:3001/images/ads/${item.img}`,
                      }}
                      width={"full"}
                      height={"full"}
                      alt={item.title}
                      resizeMode="contain"
                    />
                  </AspectRatio>
                  <TouchableOpacity
                    style={{ position: "absolute", right: 2, top: 2 }}
                  >
                    {/*  ts-ignore  */}
                    <Icon
                      as={Ionicons}
                      name="ios-heart-circle"
                      size={8}
                      color={`${"rose.600"}`}
                    />
                  </TouchableOpacity>
                </Box>
                {/* card footer  */}
                <Stack px="4" space={3}>
                  <Stack space={2}>
                    <Text
                      fontSize="xs"
                      fontWeight="500"
                      ml="-0.5"
                      mt="-1"
                      color={"gray.500"}
                    >
                      {item.category}
                    </Text>
                    <Heading size="sm" ml="-1">
                      {item.title}
                    </Heading>
                  </Stack>
                  <HStack justifyContent={"space-between"} space={2} my={2}>
                    <Button
                      variant="outline"
                      onPress={() => {
                        dispatch(
                          addToCart({
                            id: item.id,
                            img: item.img,
                            title: item.title,
                            price: item.price,
                            quantity: 1,
                          })
                        );
                      }}
                    >
                      <Ionicons
                        name="cart-outline"
                        size={25}
                        color={colors.tertiary[700]}
                      />
                    </Button>
                    <Button
                      // style={{ flex: 1 }}
                      // ml={2}
                      variant={"solid"}
                      bg={colors.tertiary[700]}
                      rightIcon={
                        <Ionicons
                          name="chevron-forward"
                          size={16}
                          color={colors.white}
                        />
                      }
                    >
                      Buy Now
                    </Button>
                  </HStack>
                </Stack>
              </VStack>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default Farmer;
