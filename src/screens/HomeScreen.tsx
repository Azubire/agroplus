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
import {
  ImageSourcePropType,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { AirbnbRating } from "react-native-ratings";
import { AppState } from "react-native";

import { TabParamList, TabScreenProps } from "../navigations/appTabs/types";
import { useScrollToTop } from "@react-navigation/native";
import CustomStatusBar from "../components/CustomStatusBar";

const img1 = require("../../assets/app_images/distributors/img1.jpg");
const img2 = require("../../assets/app_images/distributors/img2.jpg");

const fImg2 = require("../../assets/app_images/farmers/img2.png");
const fImg3 = require("../../assets/app_images/farmers/img3.png");
const fImg4 = require("../../assets/app_images/farmers/img4.png");
const fImg5 = require("../../assets/app_images/farmers/img5.png");
const fImg6 = require("../../assets/app_images/farmers/img6.png");
const fImg7 = require("../../assets/app_images/farmers/img7.png");
const fImg8 = require("../../assets/app_images/farmers/img8.png");

const data = [
  {
    distributors: [
      {
        id: 1,
        img: img1,
        name: "Md Crops Ghana",
        location: "Greater Accra, Tema",
        ratings: 234,
      },
      {
        id: 2,
        img: img2,
        name: "Dealgood ventures",
        location: "Northern Region, Tamale",
        ratings: 78,
      },
      {
        id: 3,
        img: img1,
        name: "Cash Crops",
        location: "Ashanti Region, Kumasi",
        ratings: 154,
      },
      {
        id: 4,
        img: img2,
        name: "Genesis Crops Ghana",
        location: "Eastern region, Koforidua",
        ratings: 304,
      },
      {
        id: 5,
        img: img1,
        name: "Greener Hub",
        location: "Eastern region, Koforidua",
        ratings: 120,
      },
      {
        id: 6,
        img: img2,
        name: "Let's Farm Gh",
        location: "Greater Accra, Tema",
        ratings: 144,
      },
    ],

    famers: [
      {
        id: 1,
        img: fImg4,
        title: "Fresh maize from the farm ",
        category: "cereal",
        favourite: false,
      },
      {
        id: 2,
        img: fImg5,
        title: "Fresh rice from the farm ",
        category: "cereal",
        favourite: true,
      },
      {
        id: 3,
        img: fImg3,
        title: "Fresh wheat",
        category: "cereal",
        favourite: true,
      },
      {
        id: 4,
        img: fImg2,
        title: "Fresh Vegetables ",
        category: "Vegetable",
        favourite: false,
      },
      {
        id: 5,
        img: fImg2,
        title: "Big cassava freshly cultivated ",
        category: "Root And Tuber",
        favourite: true,
      },
      {
        id: 6,
        img: fImg6,
        title: "Fresh Potatoes ",
        category: "cereal",
        favourite: false,
      },
      {
        id: 7,
        img: fImg7,
        title: "Sweet potatoes",
        category: "cereal",
        favourite: false,
      },
      {
        id: 8,
        img: fImg8,
        title: "Fresh Watermelons ",
        category: "cereal",
        favourite: false,
      },
    ],
    newProduce: [
      {
        id: 6,
        img: fImg6,
        title: "Fresh Potatoes ",
        category: "cereal",
        favourite: true,
      },
      {
        id: 7,
        img: fImg7,
        title: "Sweet potatoes",
        category: "cereal",
        favourite: false,
      },
      {
        id: 8,
        img: fImg8,
        title: "Fresh Watermelons ",
        category: "cereal",
        favourite: false,
      },
      {
        id: 5,
        img: fImg2,
        title: "Cassava freshly cultivated ",
        category: "Root And Tuber",
        favourite: true,
      },
      {
        id: 1,
        img: fImg4,
        title: "Fresh maize from the farm ",
        category: "cereal",
        favourite: false,
      },
      {
        id: 2,
        img: fImg5,
        title: "Fresh rice from the farm ",
        category: "cereal",
        favourite: true,
      },
      {
        id: 3,
        img: fImg3,
        title: "Fresh wheat",
        category: "cereal",
        favourite: true,
      },
      {
        id: 4,
        img: fImg2,
        title: "Fresh Vegetables  ",
        category: "Vegetable",
        favourite: false,
      },
    ],
  },
];

const Home: React.FC<TabScreenProps<"Home">> = ({ navigation }) => {
  const { colors } = useTheme();

  const ref = useRef(null);
  useScrollToTop(ref);
  return (
    <>
      <StatusBar style="light" backgroundColor={colors.tertiary[700]} />
      <ScrollView ref={ref}>
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
                  navigation.navigate("Distributors");
                }}
                variant="ghost"
                colorScheme={"rose"}
              >
                See all
              </Button>
            </HStack>
            <FlatList
              horizontal={true}
              data={data[0].distributors}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    navigation.navigate("DistributorDetails", {
                      id: item.id.toString(),
                    });
                  }}
                >
                  <VStack
                    borderWidth={1}
                    borderColor="gray.300"
                    borderTopRadius={15}
                    mx={1}
                    width="250"
                  >
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
            <HStack
              justifyContent="space-between"
              alignItems="center"
              px={4}
              my={4}
            >
              <Heading size="sm" fontWeight={"medium"}>
                Popular Farm Produce
              </Heading>
              <Button variant="ghost" colorScheme="rose">
                See all
              </Button>
            </HStack>
            <FlatList
              horizontal={true}
              data={data[0].famers}
              renderItem={({ item }) => (
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
                    <HStack justifyContent={"space-between"} space={2}>
                      <Button variant="outline">
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
              data={data[0].newProduce}
              renderItem={({ item }) => (
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
                    <HStack justifyContent={"space-between"} space={2} pb={5}>
                      <Button variant="outline">
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
              )}
            />
          </VStack>
        </Box>
      </ScrollView>
    </>
  );
};

export default Home;
