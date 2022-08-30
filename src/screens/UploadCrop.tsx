import React from "react";
import {
  Box,
  Button,
  CheckIcon,
  FormControl,
  Input,
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
import { ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const UploadCrop: React.FC<TabScreenProps<"UploadCrop">> = ({ navigation }) => {
  const [category, setCategory] = React.useState("");
  const { colors } = useTheme();
  return (
    <SafeAreaView>
      <CustomStatusBar />

      <ScrollView>
        <Box px={4}>
          <Text fontSize="lg" textAlign="right" mt={4}>
            Create An Advert
          </Text>
          <FormControl mt={4} isInvalid={false} isRequired>
            <FormControl.Label>Title/tag</FormControl.Label>
            <Input variant="outline" placeholder="Title Of Your Ad" />
            <Box alignSelf="flex-end">
              <FormControl.HelperText>0/30</FormControl.HelperText>
            </Box>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Try different from previous passwords.
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl mt={4} isInvalid isRequired>
            <FormControl.Label>Select type of crop</FormControl.Label>
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
              onValueChange={(itemValue) => setCategory(itemValue)}
            >
              <Select.Item label="UX Research" value="ux" />
              <Select.Item label="Web Development" value="web" />
              <Select.Item label="Cross Platform Development" value="cross" />
              <Select.Item label="UI Designing" value="ui" />
              <Select.Item label="Backend Development" value="backend" />
            </Select>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Please make a selection!
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormControl.Label>Crop Quantity</FormControl.Label>
            <Input variant="outline" placeholder="Enter crop quantity" />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Please make a selection!
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormControl.Label>Price</FormControl.Label>
            <Input
              InputRightElement={
                <FormControl.HelperText mr={2}>Ghc</FormControl.HelperText>
              }
              variant="outline"
              placeholder="Describe into details"
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Please make a selection!
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormControl.Label>Describtion</FormControl.Label>
            <Input
              numberOfLines={3}
              variant="outline"
              placeholder="Describe into details"
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Please make a selection!
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormControl.Label>Upload Photo</FormControl.Label>
            <Box
              style={{
                borderStyle: "dashed",
                borderWidth: 1,
                width: "80%",
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 10,
              }}
            >
              <Ionicons
                style={{ paddingTop: 5 }}
                name="ios-cloud-upload"
                size={30}
                color={colors.tertiary[700]}
              />
              <Text my={4}>Browse gallery</Text>

              <Button rounded={15} bgColor={colors.tertiary[700]}>
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
              fontSize="3xl"
              colorScheme="tertiary"
              leftIcon={
                <Ionicons name="add" size={20} color={colors.light[100]} />
              }
            >
              Upload
            </Button>
          </View>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UploadCrop;
