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
} from "native-base";
import React, { useRef } from "react";
import { ImageSourcePropType, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { AirbnbRating } from "react-native-ratings";

import { TabParamList, TabScreenProps } from "../navigations/appTabs/types";
import { useScrollToTop } from "@react-navigation/native";
const img1 = require("../../assets/app_images/distributors/img1.jpg");
const img2 = require("../../assets/app_images/distributors/img2.jpg");

const data = [
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
];

const Home: React.FC<TabScreenProps<"Home">> = ({ navigation }) => {
  const { colors } = useTheme();

  const ref = useRef(null);
  useScrollToTop(ref);
  return (
    <>
      <StatusBar style="auto" animated backgroundColor={colors.white} />
      <Box pt={4} flex={1}>
        <ScrollView ref={ref}>
          {/* Welcome msessage  */}
          <VStack px={4}>
            <Text fontSize="lg" bold>
              Hi Michael ✋
            </Text>
            <Text>Let's find you a distributor </Text>
          </VStack>
          {/* Search Component  */}
          <VStack mt={4} px={4}>
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
          <VStack bg="gray.200" mt={4} p={5} borderRadius={10} mx={4}>
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
              <Heading size="sm">Most Popular Distributors</Heading>
              <Button variant="ghost" color="rose.500">
                See all
              </Button>
            </HStack>
            <FlatList
              horizontal={true}
              data={data}
              renderItem={({ item }) => (
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
                    <VStack>
                      <Text fontWeight="400">{item.ratings}</Text>
                      <AirbnbRating count={5} size={15} showRating={false} />
                      {item.ratings}
                    </VStack>
                  </Stack>
                </VStack>
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
              <Text>Most Popular Distributors</Text>
              <Button variant="ghost" color="rose.500">
                See all
              </Button>
            </HStack>
            <FlatList
              horizontal={true}
              data={data}
              renderItem={({ item }) => (
                <VStack
                  borderWidth={1}
                  borderColor="gray.300"
                  mx={1}
                  width="250"
                >
                  <Box>
                    <AspectRatio w="100%">
                      <Image
                        source={item.img}
                        width={"full"}
                        // height={100}
                        alt={item.name}
                      />
                    </AspectRatio>
                  </Box>
                  <Stack p="4" space={3}>
                    <Stack space={2}>
                      <Heading size="md" ml="-1">
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
                    <Text fontWeight="400">{item.ratings}</Text>
                  </Stack>
                </VStack>
              )}
            />
          </VStack>
        </ScrollView>
      </Box>
    </>
  );
};

export default Home;
