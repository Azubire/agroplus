import { View } from "react-native";
import React from "react";
import { Box, Icon, Text, useTheme } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import CustomStatusBar from "./CustomStatusBar";
import { StatusBarStyle } from "expo-status-bar";

const AccessDenied = ({ style }: { style?: StatusBarStyle }) => {
  const { colors } = useTheme();

  return (
    <Box alignSelf="center" justifyContent="center" alignItems="center">
      <CustomStatusBar style={style} />
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
  );
};

export default AccessDenied;
