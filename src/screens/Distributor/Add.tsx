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
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import "fast-text-encoding";

import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  createDistributor,
  getDistributors,
} from "../../store/features/distributorSlice";
import { getUser } from "../../store/features/userSlice";
import { RootStackScreenProps } from "../../navigations/AppStack/types";
import CustomStatusBar from "../../components/CustomStatusBar";

interface IFormData {
  name: string;
  email: string;
  contact: string;
  website: string;
  profile: string;
  location: string;
}

const schema = Joi.object<any, true, IFormData>({
  name: Joi.string().required(),
  email: Joi.string().required(),
  website: Joi.string().required(),
  contact: Joi.string().required(),
  profile: Joi.string().required(),
  location: Joi.string().required(),
});

const BecomeDistributor = ({
  navigation,
}: RootStackScreenProps<"BecomeDistributor">) => {
  const [category, setCategory] = React.useState("");
  const [image, setImage] = React.useState<any>();
  const [isImage, setIsImage] = React.useState(false);

  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const state = useAppSelector(getDistributors);
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
    data.append("distributor", newImg);
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
      const response = await dispatch(createDistributor(formData)).unwrap();
      console.log("data", response);
      reset();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <SafeAreaView>
      <CustomStatusBar style="light" />

      {user.userToken ? (
        <ScrollView>
          <Box px={4}>
            <Text fontSize="lg" textAlign="center" mt={4}>
              Apply to become a distributor
            </Text>
            {/* title */}
            <FormControl mt={4} isInvalid={Boolean(errors.name)}>
              <FormControl.Label>Name</FormControl.Label>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field: { onChange } }) => (
                  <>
                    <Input
                      onChangeText={onChange}
                      variant="outline"
                      placeholder="Enter name of your business"
                    />
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {errors.name?.message}
                    </FormControl.ErrorMessage>
                  </>
                )}
              />
            </FormControl>

            {/* email */}
            <FormControl mt={4} isInvalid={Boolean(errors.email)}>
              <FormControl.Label>Email</FormControl.Label>
              <Controller
                name="email"
                control={control}
                defaultValue={undefined}
                render={({ field: { onChange } }) => (
                  <>
                    <Input
                      onChangeText={onChange}
                      variant="outline"
                      placeholder="Enter email"
                    />
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {errors.email?.message}
                    </FormControl.ErrorMessage>
                  </>
                )}
              />
            </FormControl>
            {/* contact  */}
            <FormControl mt={4} isInvalid={Boolean(errors.contact)}>
              <FormControl.Label>Contact</FormControl.Label>
              <Controller
                name="contact"
                control={control}
                defaultValue=""
                render={({ field: { onChange } }) => (
                  <>
                    <Input
                      onChangeText={onChange}
                      variant="outline"
                      placeholder="Enter your contact"
                    />
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {errors.contact?.message}
                    </FormControl.ErrorMessage>
                  </>
                )}
              />
            </FormControl>
            {/* website  */}
            <FormControl mt={4} isInvalid={Boolean(errors.website)}>
              <FormControl.Label>website</FormControl.Label>
              <Controller
                name="website"
                control={control}
                defaultValue=""
                render={({ field: { onChange } }) => (
                  <>
                    <Input
                      onChangeText={onChange}
                      variant="outline"
                      placeholder="Enter your website"
                    />
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {errors.website?.message}
                    </FormControl.ErrorMessage>
                  </>
                )}
              />
            </FormControl>
            {/* profile  */}
            <FormControl mt={4} isInvalid={Boolean(errors.profile)}>
              <FormControl.Label>Profile</FormControl.Label>
              <Controller
                name="profile"
                control={control}
                defaultValue=""
                render={({ field: { onChange } }) => (
                  <>
                    <Input
                      onChangeText={onChange}
                      numberOfLines={3}
                      variant="outline"
                      placeholder="Enter your profile"
                    />
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {errors.profile?.message}
                    </FormControl.ErrorMessage>
                  </>
                )}
              />
            </FormControl>
            {/* location  */}
            <FormControl mt={4} isInvalid={Boolean(errors.location)}>
              <FormControl.Label>Location</FormControl.Label>
              <Controller
                name="location"
                control={control}
                defaultValue=""
                render={({ field: { onChange } }) => (
                  <>
                    <Input
                      onChangeText={onChange}
                      variant="outline"
                      placeholder="Enter your location"
                    />
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {errors.location?.message}
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
                colorScheme="info"
                leftIcon={
                  <Ionicons name="add" size={20} color={colors.light[100]} />
                }
                onPress={handleSubmit(onSubmit)}
              >
                Submit
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

export default BecomeDistributor;
