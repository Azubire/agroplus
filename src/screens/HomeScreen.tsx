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
  IDistributor,
} from "../store/features/distributorSlice";
import { getFarmerState, IFarmer } from "../store/features/famerSlice";
import { addToCart } from "../store/features/cartSlice";

const Home: React.FC<TabScreenProps<"Home">> = ({ navigation }) => {
  const [loading, setLoading] = React.useState(true);
  const [distributors, setDistributors] = React.useState<IDistributor[]>([]);
  const [farmers, setFarmers] = React.useState<IFarmer[]>([]);
  const [newProduce, setNewProduce] = React.useState<IFarmer[]>([]);

  const dispatch = useAppDispatch();
  const distributorState = useAppSelector(getDistributors);
  const famerState = useAppSelector(getFarmerState);
  const { colors } = useTheme();

  React.useEffect(() => {
    setDistributors(distributorState.data);
    setFarmers(famerState.data.farmer);
    setNewProduce(famerState.data.newProduce);
    setLoading(false);
  }, []);

  const ref = useRef(null);
  useScrollToTop(ref);

  return (
    <ScrollView ref={ref}>
      <StatusBar style="light" />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Box mb={8}>
          {/* Welcome msessage  */}
          <VStack px={4} pt={4}>
            <Text fontSize="lg" bold>
              Hi Michael ✋
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
              data={distributors}
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
                          source={item.img}
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
              data={farmers}
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
                          source={item.img}
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
                          color={`${item.favourite ? "rose.600" : "gray.500"}`}
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
              data={newProduce}
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
                          source={item.img}
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
                          color={`${item.favourite ? "rose.600" : "gray.500"}`}
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
