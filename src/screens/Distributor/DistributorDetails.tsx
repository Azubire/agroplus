import { View, ActivityIndicator, Image, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomStatusBar from "../../components/CustomStatusBar";
import { RootStackScreenProps } from "../../navigations/AppStack/types";
import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Input,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { useAppSelector } from "../../hooks/reduxHooks";
import {
  filterDistributor,
  getDistributors,
  IDistributor,
} from "../../store/features/distributorSlice";
import { AirbnbRating } from "react-native-ratings";
import { Ionicons } from "@expo/vector-icons";

const DistributorDetails = ({
  navigation,
  route,
}: RootStackScreenProps<"DistributorDetails">) => {
  const [distributor, setDistributor] = React.useState<IDistributor>();
  const [loading, setLoading] = React.useState(true);

  const { id } = route.params;

  const { colors } = useTheme();
  const filteredDistributor = useAppSelector(filterDistributor(parseInt(id)));

  React.useEffect(() => {
    navigation.setOptions({ title: filteredDistributor[0].name });
    setDistributor(filteredDistributor[0]);
    setLoading(false);
  }, []);

  return (
    <ScrollView>
      <CustomStatusBar style="light" />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Box>
          {/* heading / image  */}
          <Box>
            <Image
              source={{
                uri: `http://192.168.43.35:3001/images/distributors/${distributor?.img}`,
              }}
              style={{ height: 200, width: "100%" }}
              resizeMode="cover"
            />
          </Box>
          <VStack px={2} mt={6}>
            <HStack justifyContent="space-between" alignItems="center">
              <Heading>{distributor?.name}</Heading>
              <Button rounded={30} variant="outline">
                Follow
              </Button>
            </HStack>
            <HStack>
              <Text>{`4.8 `}</Text>
              <AirbnbRating count={5} size={12} showRating={false} />
              <Text>{distributor?.ratings}</Text>
            </HStack>
            <Text mt={2}>We are located at {distributor?.location}</Text>
            <Text color={colors.tertiary[700]}>
              Joined date: {distributor?.createdAt}
            </Text>

            {/* profile  */}
            <Box mt={6} mb={10}>
              <Text>{distributor?.profile}</Text>
              <VStack mt={6}>
                <Text fontSize="xl" fontWeight="semibold">
                  Contact Details
                </Text>
                <Input
                  editable={false}
                  leftElement={
                    <Icon
                      color={colors.success[700]}
                      mr={1}
                      as={<Ionicons name="logo-web-component" />}
                    />
                  }
                  variant="underlined"
                  defaultValue={"Website: " + distributor?.website}
                />
                <Input
                  editable={false}
                  leftElement={
                    <Icon
                      color={colors.secondary[700]}
                      mr={2}
                      as={<Ionicons name="mail" />}
                    />
                  }
                  variant="underlined"
                  defaultValue={"Email: " + distributor?.email}
                />
                <Input
                  editable={false}
                  leftElement={
                    <Icon
                      color={colors.tertiary[700]}
                      mr={1}
                      as={<Ionicons name="call" />}
                    />
                  }
                  variant="underlined"
                  defaultValue={"Contact Number: " + distributor?.contact}
                />
              </VStack>
            </Box>
          </VStack>
        </Box>
      )}
    </ScrollView>
  );
};

export default DistributorDetails;
