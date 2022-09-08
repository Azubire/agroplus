import React from "react";
import {
  Box,
  Button,
  CheckIcon,
  FormControl,
  Icon,
  Input,
  Modal,
  Select,
  Text,
  useTheme,
  View,
  WarningOutlineIcon,
} from "native-base";
import { DrawerScreenPropsType } from "../navigations/AppDrawer/Types";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabScreenProps } from "../navigations/appTabs/types";
import CustomStatusBar from "../components/CustomStatusBar";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import "fast-text-encoding";

import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { createAd, getAdState } from "../store/features/adSlice";
import { getUser } from "../store/features/userSlice";

interface IFormData {
  title: string;
  category: string;
  price: number;
  description: string;
}

const schema = Joi.object<any, true, IFormData>({
  title: Joi.string().max(30).required(),
  category: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
});

const UploadCrop: React.FC<TabScreenProps<"UploadCrop">> = ({ navigation }) => {
  const [category, setCategory] = React.useState("");
  const [image, setImage] = React.useState<any>();
  const [isImage, setIsImage] = React.useState(false);

  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const state = useAppSelector(getAdState);
  const { user } = useAppSelector(getUser);

  //react-hook-form
  const {
    reset,
    handleSubmit,
    control,
    formState: {
      errors,
      isSubmitSuccessful,
      isValid,
      isDirty,
      isSubmitting,
      isValidating,
    },
  } = useForm<IFormData>({
    defaultValues: {},
    resolver: joiResolver(schema),
    // resolver: async (data, context, options) => {
    //   // you can debug your validation schema here
    //   // console.log("formData", data);
    //   console.log(
    //     "validation result",
    //     await joiResolver(schema)(data, context, options)
    //   );
    //   return joiResolver(schema)(data, context, options);
    // },
  });

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
      setIsImage(true);
    }
  };

  //create form data
  const createFormData = (image: any, body: any) => {
    const newImg = {
      uri: image.uri,
      name: image.uri.split("/").pop(),
      type: mime.getType(image.uri),
    };
    const data = new FormData();
    //@ts-ignore
    data.append("adImage", newImg);
    data.append("userId", user.userId.toString());

    for (let key in body) {
      data.append(key, body[key]);
    }

    return data;
  };

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    if (!isImage) return;
    const formData = createFormData(image, data);
    // console.log(formData);

    try {
      const response = await dispatch(createAd(formData)).unwrap();
      // console.log("data", response);
      reset();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <SafeAreaView>
      <CustomStatusBar />

      {user.userToken ? (
        <ScrollView>
          <Box px={4}>
            <Text fontSize="lg" textAlign="right" mt={4}>
              Create An Advert
            </Text>
            {/* title */}
            <FormControl mt={4} isInvalid={Boolean(errors.title)} isRequired>
              <FormControl.Label>Title/tag</FormControl.Label>
              <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field: { onChange } }) => (
                  <>
                    <Input
                      onChangeText={onChange}
                      variant="outline"
                      placeholder="Title Of Your Ad"
                    />
                    <Box flexDirection="row" justifyContent="space-between">
                      <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}
                      >
                        {errors.title?.message}
                      </FormControl.ErrorMessage>

                      <FormControl.HelperText>0/30</FormControl.HelperText>
                    </Box>
                  </>
                )}
              />
            </FormControl>
            {/* category  */}
            <FormControl mt={4} isInvalid={Boolean(errors.category)}>
              <FormControl.Label>Select type of crop</FormControl.Label>
              <Controller
                name="category"
                control={control}
                defaultValue=""
                render={({ field: { onChange } }) => (
                  <>
                    <Select
                      selectedValue={category}
                      minWidth="200"
                      accessibilityLabel="Choose Category"
                      placeholder="Choose Category"
                      _selectedItem={{
                        bg: "tertiary.600",
                        endIcon: <CheckIcon size="5" />,
                      }}
                      mt={1}
                      onValueChange={(text) => {
                        setCategory(text);
                        return onChange(text);
                      }}
                    >
                      <Select.Item label="Vegetable" value="1" />
                      <Select.Item label="Cereal" value="2" />
                      <Select.Item label="Root & Tuber" value="3" />
                    </Select>
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      Please select a category!
                    </FormControl.ErrorMessage>
                  </>
                )}
              />
            </FormControl>
            {/* quantity  */}
            {/* <FormControl mt={4} isInvalid={Boolean(errors.quantity)}>
            <FormControl.Label>Crop Quantity</FormControl.Label>
            <Controller
              name="quantity"
              control={control}
              defaultValue={undefined}
              render={({ field: { onChange } }) => (
                <>
                  <Input
                    onChangeText={onChange}
                    variant="outline"
                    placeholder="Enter crop quantity"
                  />
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    {errors.quantity?.message}
                  </FormControl.ErrorMessage>
                </>
              )}
            />
          </FormControl> */}
            {/* price */}
            <FormControl mt={4} isInvalid={Boolean(errors.price)}>
              <FormControl.Label>Price</FormControl.Label>
              <Controller
                name="price"
                control={control}
                defaultValue={undefined}
                render={({ field: { onChange } }) => (
                  <>
                    <Input
                      onChangeText={onChange}
                      InputRightElement={
                        <FormControl.HelperText mr={2}>
                          Ghc
                        </FormControl.HelperText>
                      }
                      variant="outline"
                      placeholder="Describe into details"
                    />
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {errors.price?.message}
                    </FormControl.ErrorMessage>
                  </>
                )}
              />
            </FormControl>
            {/* description  */}
            <FormControl mt={4} isInvalid={Boolean(errors.description)}>
              <FormControl.Label>Description</FormControl.Label>
              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field: { onChange } }) => (
                  <>
                    <Input
                      onChangeText={onChange}
                      numberOfLines={3}
                      variant="outline"
                      placeholder="Describe into details"
                    />
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {errors.description?.message}
                    </FormControl.ErrorMessage>
                  </>
                )}
              />
            </FormControl>
            {/* upload photo */}
            <FormControl mt={4} isRequired>
              <FormControl.Label>Upload Photo</FormControl.Label>
              <Box
                style={{
                  borderStyle: "dashed",
                  borderWidth: 1,
                  width: "100%",
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 10,
                }}
              >
                {/* @ts-ignore */}
                {image ? (
                  <Image
                    /* @ts-ignore */
                    source={{ uri: image.uri }}
                    style={{ height: 100, width: "100%" }}
                    resizeMode="cover"
                  />
                ) : (
                  <Text my={2} color={colors.danger[700]}>
                    Please select an image
                  </Text>
                )}
                <Ionicons
                  style={{ paddingTop: 5 }}
                  name="ios-cloud-upload"
                  size={30}
                  color={colors.tertiary[700]}
                />

                <Button
                  rounded={15}
                  bgColor={colors.tertiary[700]}
                  onPress={pickImage}
                >
                  <Ionicons
                    name="add-circle"
                    size={20}
                    color={colors.light[100]}
                  />
                </Button>
              </Box>
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Please make a selection!
              </FormControl.ErrorMessage>
            </FormControl>

            <View alignSelf="center" my={8} w="full">
              <Button
                isLoading={Boolean(state.status === "loading")}
                fontSize="3xl"
                colorScheme="tertiary"
                leftIcon={
                  <Ionicons name="add" size={20} color={colors.light[100]} />
                }
                onPress={handleSubmit(onSubmit)}
              >
                Upload
              </Button>
            </View>
          </Box>
        </ScrollView>
      ) : (
        <Box alignSelf="center" justifyContent="center" alignItems="center">
          <Icon
            mt={5}
            alignSelf="center"
            size={90}
            color={colors.danger[700]}
            as={<Ionicons name="close-circle-outline" />}
          />
          <Text my={3} fontSize="lg">
            You have to be logged in to access content
          </Text>
        </Box>
      )}
    </SafeAreaView>
  );
};

export default UploadCrop;
