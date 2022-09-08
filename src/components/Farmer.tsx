import { TouchableOpacity, View } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { getUser, updateProfilePhoto } from "../store/features/userSlice";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  HStack,
  Icon,
  Input,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";

const Farmer = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [image, setImage] = React.useState<any>();
  const { user } = useAppSelector(getUser);
  console.log(user);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result);
    }
  };

  React.useEffect(() => {}, [user]);

  //create form data
  const createFormData = (image: any) => {
    const newImg = {
      uri: image.uri,
      name: image.uri.split("/").pop(),
      type: mime.getType(image.uri),
    };
    const data = new FormData();
    //@ts-ignore
    data.append("profilePhoto", newImg);

    return data;
  };

  const uploadPhoto = async () => {
    if (!image) return;

    const photo = createFormData(image);

    try {
      const data = await dispatch(
        updateProfilePhoto({ photo, id: user.userId })
      ).unwrap();
      // console.log("succes", data);
    } catch (error) {
      // console.log("faild", error);
    }
  };

  return (
    <View>
      <Box bg="tertiary.700">
        <HStack space={3} justifyContent="space-evenly" py={6}>
          <VStack space={1}>
            <Text color={colors.lightText}>Username : {user.username}</Text>
            <Text color={colors.lightText}>
              Account Type : <Text color={colors.lime[500]}>Farmer</Text>
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
                uri: `http://192.168.43.35:3001/images/users/${user.img}`,
              }}
            >
              {user.username.split(" ")[1].slice(0, 2).toUpperCase()}
            </Avatar>
            <TouchableOpacity onPress={pickImage}>
              <Icon
                position="absolute"
                right={0}
                bottom={0}
                color="#fff"
                size={35}
                as={<Ionicons name="camera-outline" />}
              />
            </TouchableOpacity>
            {image ? <Button onPress={uploadPhoto}>Save photo</Button> : null}
          </Box>
        </HStack>
        <HStack justifyContent="space-evenly" alignItems="center" mb={3}>
          <Text color={colors.lightText}>
            To become a distributor, apply here
          </Text>
          <Button
            colorScheme="danger"
            w="1/3"
            onPress={() => {
              navigation.navigate("Root", { screen: "BecomeDistributor" });
            }}
          >
            Apply
          </Button>
        </HStack>
      </Box>
      <Box px={6} mt={6}>
        <Text textAlign="center" fontSize="lg" bold mt={6} underline>
          Profile
        </Text>
        <VStack space={2} mt={6}>
          <FormControl>
            <FormControl.Label>Full Name</FormControl.Label>
            <Input
              editable={false}
              size="lg"
              variant="underlined"
              defaultValue={user.username}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Email Address</FormControl.Label>
            <Input
              editable={false}
              size="lg"
              variant="underlined"
              defaultValue={user.email}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Contact Number</FormControl.Label>
            <Input
              editable={false}
              size="lg"
              variant="underlined"
              defaultValue="+233242124312"
            />
          </FormControl>
        </VStack>
      </Box>
    </View>
  );
};

export default Farmer;
