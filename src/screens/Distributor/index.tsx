import { ActivityIndicator, TouchableOpacity, View } from "react-native";
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
import { useAppSelector } from "../../hooks/reduxHooks";
import {
  getDistributors,
  IDistributor,
} from "../../store/features/distributorSlice";

interface stateTypes {
  id: number;
  title: string;
}
const filterItemsData = [
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

const Distributors: React.FC<RootStackScreenProps<"Distributors">> = ({
  navigation,
  route,
}) => {
  const [state, setState] = React.useState(1);
  const [loading, setloading] = React.useState(true);
  const [filterItems, setFilterItems] = React.useState<Array<stateTypes>>([]);
  const [distributors, setDistributors] = React.useState<IDistributor[]>([]);

  const distributorState = useAppSelector(getDistributors);
  const { colors } = useTheme();

  React.useEffect(() => {
    setDistributors(distributorState.data);
    setloading(false);
  }, []);

  React.useEffect(() => {
    setFilterItems(filterItemsData);
  }, [state]);

  return (
    <>
      <CustomStatusBar style="light" />
      <Box my={8}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filterItems}
          keyExtractor={(item) => item.id.toString()}
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
                setState((prev) => item.id);
              }}
            >
              {item.title}
            </Button>
          )}
        />
      </Box>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          horizontal={false}
          data={distributors}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{ flex: 1 }}
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
                m={1}
                // height="250"
              >
                <Box>
                  <AspectRatio w="100%" ratio={4 / 3}>
                    <Image
                      source={{
                        uri: `http://192.168.43.35:3001/images/distributors/${item.img}`,
                      }}
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
          )}
        />
      )}
    </>
  );
};

export default Distributors;
