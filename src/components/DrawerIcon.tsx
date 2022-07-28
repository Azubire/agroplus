import { View, Text } from "react-native";
import React from "react";
import { Icon } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type PropTypes = {
  name: string;
  index: number;
};

const DrawerIcon: React.FC<PropTypes> = ({ name, index }) => {
  let iconName;

  switch (name) {
    case "Home":
      iconName = (
        <Icon
          color={index === index ? "primary.500" : "gray.500"}
          size="5"
          as={<MaterialCommunityIcons name="home" />}
        />
      );
    case "Settings":
      iconName = (
        <Icon
          color={index === index ? "primary.500" : "gray.500"}
          size="5"
          as={<MaterialCommunityIcons name="home" />}
        />
      );
    default:
      iconName = (
        <Icon
          color={index === index ? "primary.500" : "gray.500"}
          size="5"
          as={<MaterialCommunityIcons />}
        />
      );
  }

  return iconName;
};

export default DrawerIcon;
