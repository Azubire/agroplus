import { StatusBar } from "expo-status-bar";
import {
  AspectRatio,
  Box,
  Center,
  Heading,
  HStack,
  Stack,
  View,
  Text,
  Image,
  useTheme,
  Button,
  VStack,
  Input,
  Icon,
  FlatList,
  InfoIcon,
} from "native-base";
import React, { useRef } from "react";
import { ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AirbnbRating } from "react-native-ratings";

import { TabScreenProps } from "../navigations/appTabs/types";
import { useScrollToTop } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  getDistributors,
  getDistributorsFromDb,
  IDistributor,
} from "../store/features/distributorSlice";
import { getAds, getFarmerState, IFarmer } from "../store/features/famerSlice";
import { addToCart } from "../store/features/cartSlice";
import { getUser } from "../store/features/userSlice";

const Home: React.FC<TabScreenProps<"Home">> = ({ navigation }) => {
  // const [loading, setLoading] = React.useState(true);
  // const [distributors, setDistributors] = React.useState<IDistributor[]>([]);
  // const [farmers, setFarmers] = React.useState<IFarmer[]>([]);
  // const [newProduce, setNewProduce] = React.useState<IFarmer[]>([]);

  const dispatch = useAppDispatch();
  const distributorState = useAppSelector(getDistributors);
  const adState = useAppSelector(getFarmerState);
  const { user } = useAppSelector(getUser);
  const { isDistributor } = useAppSelector(getUser);
  const { colors } = useTheme();

  const fetchAds = async () => {
    try {
      const data = await dispatch(getAds()).unwrap();
      // console.log("data", data);
    } catch (error) {
      console.log("eror", error);
    }
  };
  const fetchDistributors = async () => {
    try {
      const dData = await dispatch(getDistributorsFromDb()).unwrap();
      // console.log("dData", dData);
    } catch (error) {
      console.log("eror", error);
    }
  };

  React.useEffect(() => {
    fetchAds();
    fetchDistributors();
  }, []);

  const ref = useRef(null);
  useScrollToTop(ref);

  return (
    <ScrollView ref={ref}>
      <StatusBar style="light" />
      {Boolean(
        distributorState.status === "loading" ||
          distributorState.status === "idle" ||
          adState.status === "loading" ||
          adState.status === "idle"
      ) ? (
        <ActivityIndicator size="large" />
      ) : (
        <Box mb={8}>
          {/* Welcome msessage  */}
          <VStack px={4} pt={4}>
            <Text fontSize="lg" bold>
              Hello {user.username ? user.username.split(" ")[1] : "there"} ✋
            </Text>
            <Text>Let's find you a distributor </Text>
          </VStack>
          {/* Search Component  */}
          <VStack mt={4} px={2}>
            <Input
              variant="rounded"
              InputLeftElement={
                <Icon
                  as={<Ionicons name="search" />}
                  size={5}
                  ml="4"
                  color="muted.400"
                />
              }
              placeholder="Seacr for a distributor..."
              InputRightElement={
                <Icon
                  as={<Ionicons name="filter-outline" />}
                  size={5}
                  mr="4"
                  color="muted.400"
                />
              }
            />
          </VStack>
          {/* Weather widget  */}
          <VStack bg="gray.200" mt={4} p={5} borderRadius={10} mx={2}>
            <HStack justifyContent="space-between">
              <Text color="muted.500">Today's Weather, Koforidua</Text>
              <Icon
                color="muted.500"
                as={<Ionicons name="ellipsis-horizontal" />}
              />
            </HStack>
            <HStack justifyContent="space-between" mt={3} alignItems="center">
              <VStack justifyContent="center">
                <Text color="muted.500">Friday 26</Text>
                <Text fontSize="xl" color="warning.500" bold>
                  72°F
                </Text>
                <Text color="muted.700">Chance of rain 10%</Text>
              </VStack>
              <VStack alignItems="center" justifyContent="center">
                <Icon
                  color="warning.500"
                  size={10}
                  as={<Ionicons name="cloudy" />}
                />
                <Text color="muted.700">Cloudy</Text>
              </VStack>
            </HStack>
          </VStack>
          {/* Most popular distributors section  */}
          <VStack>
            <HStack
              justifyContent="space-between"
              alignItems="center"
              px={4}
              my={4}
            >
              <Heading size="sm" fontWeight="medium">
                Most Popular Distributors
              </Heading>
              <Button
                onPress={() => {
                  navigation.navigate("Root", {
                    screen: "Distributors",
                  });
                }}
                variant="ghost"
                colorScheme={"rose"}
              >
                See all
              </Button>
            </HStack>
            <FlatList
              horizontal={true}
              data={distributorState.data}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    navigation.navigate("DistributorDetails", {
                      id: item.id.toString(),
                    });
                  }}
                >
                  {/* card start  */}
                  <VStack
                    borderWidth={1}
                    borderColor="gray.300"
                    borderTopRadius={15}
                    mx={1}
                    width="250"
                  >
                    {/* card image  */}
                    <Box>
                      <AspectRatio w="100%" ratio={4 / 3}>
                        <Image
                          source={{
                            uri: `http://192.168.43.35:3001/images/distributors/${item.img}`,
                          }}
                          borderTopRadius={15}
                          width={"full"}
                          height={"full"}
                          alt={item.name}
                        />
                      </AspectRatio>
                    </Box>
                    {/* card content  */}
                    <Stack p="4" space={3}>
                      <Stack space={2}>
                        <Heading size="sm" ml="-1">
                          {item.name}
                        </Heading>
                        <Text
                          fontSize="xs"
                          fontWeight="500"
                          ml="-0.5"
                          mt="-1"
                          color={"gray.500"}
                        >
                          {item.location}
                        </Text>
                      </Stack>
                      <HStack>
                        <Text>{`4.8 `}</Text>
                        <AirbnbRating count={5} size={15} showRating={false} />
                        <Text> {` (${item.ratings})`}</Text>
                      </HStack>
                    </Stack>
                  </VStack>
                </TouchableOpacity>
              )}
            />
          </VStack>
          {/* Most Farm Produce section  */}
          <VStack>
            {/* // famers section  */}
            <HStack
              justifyContent="space-between"
              alignItems="center"
              px={4}
              my={4}
            >
              <Heading size="sm" fontWeight={"medium"}>
                Popular Farm Produce
              </Heading>
              <Button
                variant="ghost"
                colorScheme="rose"
                onPress={() => {
                  navigation.navigate("FarmProduce");
                }}
              >
                See all
              </Button>
            </HStack>
            <FlatList
              horizontal={true}
              data={adState.data.farmer}
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
                  <VStack
                    borderWidth={1}
                    borderColor="gray.300"
                    mx={1}
                    width="250"
                  >
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
                                productId: item.id,
                                img: item.img,
                                title: item.title,
                                price: item.price,
                                qty: 1,
                                userId: item.userId,
                                distributorId: user.userId,
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
                          style={{ flex: 1 }}
                          // ml={2}
                          variant={"solid"}
                          bg={colors.tertiary[700]}
                          endIcon={
                            <Ionicons
                              name="chevron-forward"
                              size={16}
                              color={colors.white}
                            />
                          }
                          onPress={() => {
                            navigation.navigate("FarmProduceDetails", {
                              id: item.id.toString(),
                            });
                          }}
                        >
                          Buy Now
                        </Button>
                      </HStack>
                    </Stack>
                  </VStack>
                </TouchableOpacity>
              )}
            />
          </VStack>
          {/* New Farm Produce section  */}
          <VStack>
            <HStack
              justifyContent="space-between"
              alignItems="center"
              px={4}
              my={4}
            >
              <Heading size="sm" fontWeight={"medium"}>
                New Farm Produce
              </Heading>
              <Button variant="ghost" colorScheme="rose">
                See all
              </Button>
            </HStack>
            <FlatList
              horizontal={true}
              data={adState.data.newProduce}
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
                  <VStack
                    borderWidth={1}
                    borderColor="gray.300"
                    mx={1}
                    width="250"
                  >
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
                        />
                      </AspectRatio>
                      <TouchableOpacity
                        style={{ position: "absolute", right: 2, top: 2 }}
                      >
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
                      <HStack justifyContent={"space-between"} space={2} py={2}>
                        <Button
                          variant="outline"
                          onPress={() => {
                            dispatch(
                              addToCart({
                                productId: item.id,
                                img: item.img,
                                title: item.title,
                                price: item.price,
                                qty: 1,
                                userId: item.userId,
                                distributorId: user.userId,
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
                          style={{ flex: 1 }}
                          // ml={2}
                          variant={"solid"}
                          bg={colors.tertiary[700]}
                          endIcon={
                            <Ionicons
                              name="chevron-forward"
                              size={16}
                              color={colors.white}
                            />
                          }
                        >
                          Contact Now
                        </Button>
                      </HStack>
                    </Stack>
                  </VStack>
                </TouchableOpacity>
              )}
            />
          </VStack>
        </Box>
      )}
    </ScrollView>
  );
};

export default Home;
