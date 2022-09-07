import {
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  ActionSheetIOS,
} from "react-native";
import React from "react";
import CustomStatusBar from "../../components/CustomStatusBar";
import {
  Actionsheet,
  AspectRatio,
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Modal,
  Stack,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { AirbnbRating } from "react-native-ratings";
import { Ionicons } from "@expo/vector-icons";
import produce from "immer";
import {
  getProduce,
  getRelatedProduce,
  IFarmer,
} from "../../store/features/famerSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootStackScreenProps } from "../../navigations/AppStack/types";
import { addToCart } from "../../store/features/cartSlice";

const FarmerDetails = ({
  navigation,
  route,
}: RootStackScreenProps<"FarmProduceDetails">) => {
  const [loading, setLoading] = React.useState(true);
  const [produce, setProduce] = React.useState<IFarmer>({
    price: 0,
    id: 0,
    title: "",
    img: "",
    description: "",
    userId: 0,
    category: "",
    createdAt: "",
  });

  const dispatch = useAppDispatch();

  const { id } = route.params;
  const { colors } = useTheme();
  const farmer = useAppSelector(getProduce(parseInt(id)));
  const filtered = useAppSelector(getRelatedProduce(parseInt(id)));

  // console.log(filtered);

  React.useEffect(() => {
    setProduce(farmer[0]);
    setLoading(false);
  }, [id]);

  return (
    <View>
      <CustomStatusBar style="light" />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          horizontal={false}
          data={filtered}
          ListHeaderComponent={() => (
            <Box mx={2}>
              {/* heading / image  */}
              <Box>
                <Image
                  source={{
                    uri: `http://192.168.43.35:3001/images/ads/${farmer[0].img}`,
                  }}
                  alt={farmer[0].title}
                  style={{ height: 200, width: "100%" }}
                  resizeMode="cover"
                />
              </Box>
              {/* heading  */}
              <HStack
                w="full"
                mt={1}
                space={2}
                justifyContent="space-between"
                alignItems="center"
              >
                <Heading flex={3} size="sm">
                  {farmer[0].title}
                </Heading>
                <Button flex={1} rounded={30} variant="outline">
                  {"Ghc. " + farmer[0].price}
                </Button>
              </HStack>
              <VStack>
                <HStack>
                  <Text>{`4.8 `}</Text>
                  <AirbnbRating count={5} size={12} showRating={false} />
                  {/* <Text>{farmer[0].ratings}</Text> */}
                </HStack>
                {/* <Text mt={2}>We are located at {farmer[0].location}</Text> */}
                <Text color={colors.tertiary[700]}>
                  Posted on: {farmer[0].createdAt}
                </Text>
              </VStack>
              {/* description  */}
              <Box mt={6} mb={10}>
                <Text>{farmer[0].description}</Text>
              </Box>
              {/* action area  */}
              <HStack mt={3} justifyContent="flex-end" space={3}>
                <Button
                  leftIcon={<Icon as={<Ionicons name="basket" />} />}
                  variant="outline"
                  onPress={() =>
                    dispatch(
                      addToCart({
                        id: produce.id,
                        img: produce.img,
                        title: produce.title,
                        price: produce.price,
                        quantity: 1,
                      })
                    )
                  }
                >
                  Add to Cart
                </Button>
                <Button
                  colorScheme="tertiary"
                  rightIcon={<Icon as={<Ionicons name="chevron-forward" />} />}
                  onPress={() => {
                    navigation.navigate("Cart");
                  }}
                >
                  Checkout
                </Button>
              </HStack>
              {/* related items section  */}
              <Box my={6}>
                <Text textAlign="center" fontSize="xl" fontWeight="semibold">
                  Related Produce
                </Text>
              </Box>
            </Box>
          )}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{ flex: 1, marginBottom: 10, marginHorizontal: 6 }}
              key={index}
              activeOpacity={0.5}
              onPress={() => {
                navigation.replace("FarmProduceDetails", {
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
                    <Button variant="outline">
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

export default FarmerDetails;
