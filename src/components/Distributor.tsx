import { View } from "react-native";
import React from "react";
import { useAppSelector } from "../hooks/reduxHooks";
import { getUser } from "../store/features/userSlice";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  HStack,
  Icon,
  Input,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AirbnbRating } from "react-native-ratings";
import CustomStatusBar from "./CustomStatusBar";

const Distributor = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const { isDistributor } = useAppSelector(getUser);
  const { user } = useAppSelector(getUser);
  return (
    <ScrollView>
      <CustomStatusBar style="light" backgroundColor={colors.secondary[700]} />
      <Box bg="secondary.700">
        <HStack space={3} justifyContent="space-evenly" py={6}>
          <VStack space={1}>
            <Text color={colors.lightText}>
              Company Name : {isDistributor?.name}
            </Text>
            <Text color={colors.lightText}>
              Account Type : <Text color={colors.info[500]}>Distributor</Text>
            </Text>
            <Text color={colors.lightText}>
              Account Balance : Ghc {user.accountBalance}
            </Text>
            <Text color={colors.lightText}>
              Total Sales : {user.totalSales ? user.totalSales : 0}
            </Text>
          </VStack>
          <Box>
            <Avatar
              size="xl"
              bg="amber.700"
              source={{
                uri: `http://192.168.43.35:3001/images/distributors/${isDistributor?.img}`,
              }}
            >
              {user.username.split(" ")[1].slice(0, 2)}
            </Avatar>
          </Box>
        </HStack>
        <HStack mt={1} ml={5}>
          <AirbnbRating
            count={isDistributor?.ratings}
            size={12}
            showRating={false}
          />
        </HStack>
      </Box>
      <Box px={6} mt={6}>
        <Text textAlign="center" fontSize="lg" bold mt={6} underline>
          Company Profile Info
        </Text>
        <VStack space={2} mt={6}>
          <Text>{isDistributor?.profile}</Text>
          <FormControl>
            <FormControl.Label>Email Address</FormControl.Label>
            <Input
              editable={false}
              size="lg"
              variant="underlined"
              defaultValue={isDistributor?.email}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Location</FormControl.Label>
            <Input
              editable={false}
              size="lg"
              variant="underlined"
              defaultValue={isDistributor?.location}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Contact</FormControl.Label>
            <Input
              editable={false}
              size="lg"
              variant="underlined"
              defaultValue={isDistributor?.contact}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Website</FormControl.Label>
            <Input
              editable={false}
              size="lg"
              variant="underlined"
              defaultValue={isDistributor?.website}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Date of registration</FormControl.Label>
            <Input
              editable={false}
              size="lg"
              variant="underlined"
              defaultValue={isDistributor?.createdAt}
            />
          </FormControl>
        </VStack>
      </Box>
    </ScrollView>
  );
};

export default Distributor;
