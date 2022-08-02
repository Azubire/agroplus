import { TouchableOpacity, View } from "react-native";
import React, { useRef } from "react";
import { RootStackScreenProps } from "../../navigations/AppStack/types";
import {
  AspectRatio,
  Box,
  Button,
  FlatList,
  Heading,
  HStack,
  Image,
  ScrollView,
  Stack,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomStatusBar from "../../components/CustomStatusBar";
import { AirbnbRating } from "react-native-ratings";

const d1 = require("../../../assets/app_images/distributors/img1.jpg");
const d2 = require("../../../assets/app_images/distributors/img2.jpg");
const d3 = require("../../../assets/app_images/distributors/img9.jpeg");
const d4 = require("../../../assets/app_images/distributors/img10.jpg");
const d5 = require("../../../assets/app_images/distributors/img11.jpg");
const d6 = require("../../../assets/app_images/distributors/img12.jpg");

const filterItems = [
  {
    id: 1,
    title: "All",
  },
  {
    id: 2,
    title: "Popular",
  },
  {
    id: 3,
    title: "Newest",
  },
  {
    id: 4,
    title: "Lowest",
  },
  {
    id: 5,
    title: "Highest",
  },
  {
    id: 6,
    title: "Oldest",
  },
  {
    id: 7,
    title: "Highest Ratings",
  },
  {
    id: 8,
    title: "Lowest Ratings",
  },
];

const distributors = [
  {
    id: 1,
    img: d1,
    name: "Md Crops Ghana",
    location: "Greater Accra, Tema",
    ratings: 234,
  },
  {
    id: 2,
    img: d2,
    name: "Dealgood ventures",
    location: "Northern Region, Tamale",
    ratings: 78,
  },
  {
    id: 3,
    img: d3,
    name: "Cash Crops",
    location: "Ashanti Region, Kumasi",
    ratings: 154,
  },
  {
    id: 4,
    img: d4,
    name: "Genesis Crops Ghana",
    location: "Eastern region, Koforidua",
    ratings: 304,
  },
  {
    id: 5,
    img: d5,
    name: "Greener Hub",
    location: "Eastern region, Koforidua",
    ratings: 120,
  },
  {
    id: 6,
    img: d6,
    name: "Greener Hub",
    location: "Eastern region, Koforidua",
    ratings: 120,
  },
];

const Distributors: React.FC<RootStackScreenProps<"Distributors">> = ({
  navigation,
  route,
}) => {
  const [state, setState] = React.useState(1);
  const { colors } = useTheme();

  return (
    <>
      <CustomStatusBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box flex={1}>
          {/* filter section  */}
          <Box mt={8}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={filterItems}
              renderItem={({ item, index }) => (
                <Button
                  variant="outline"
                  // borderWidth={2}
                  bg={state === item.id ? "tertiary.700" : "gray.100"}
                  _text={{
                    color: state === item.id ? "white" : "tertiary.700",
                  }}
                  borderColor={colors.tertiary[700]}
                  mx={2}
                  px={8}
                  roundedLeft="full"
                  roundedRight="full"
                  onPress={(e) => {
                    setState(item.id);
                  }}
                >
                  {item.title}
                </Button>
              )}
            />
          </Box>
          <Box mt={8}>
            <HStack flexWrap={"wrap"} height="100%">
              {distributors.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.5}
                  onPress={() => {
                    navigation.navigate("DistributorDetails", {
                      id: item.id.toString(),
                    });
                  }}
                >
                  <VStack
                    borderWidth={1}
                    shadow={1}
                    borderColor="coolGray.200"
                    // borderTopRadius={15}
                    mx={1}
                    mb={4}
                    width="180"
                    // height="250"
                  >
                    <Box>
                      <AspectRatio w="100%" ratio={4 / 3}>
                        <Image
                          source={item.img}
                          // borderTopRadius={15}
                          width={"full"}
                          height={"full"}
                          alt={item.name}
                        />
                      </AspectRatio>
                    </Box>
                    <Stack p="4" space={3}>
                      <Stack space={2}>
                        <Heading size="xs" ml="-1">
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
                        <AirbnbRating count={5} size={10} showRating={false} />
                        <Text> {` (${item.ratings})`}</Text>
                      </HStack>
                    </Stack>
                  </VStack>
                </TouchableOpacity>
              ))}
            </HStack>
          </Box>
          <Text>d</Text>
        </Box>
      </ScrollView>
    </>
  );
};

export default Distributors;
