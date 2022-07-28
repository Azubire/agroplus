import React from "react";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Icon } from "native-base";

type iconProps = {
  name: string;
  isFocused: boolean;
};
const RenderIcon: React.FC<iconProps> = ({ name, isFocused }) => {
  let renderItem;

  switch (name) {
    case "Home":
      renderItem = (
        <Icon
          mb="1"
          as={
            <MaterialCommunityIcons
              name={isFocused ? "home" : "home-outline"}
            />
          }
          color="white"
          size="xl"
        />
      );
      break;
    case "Explore":
      renderItem = (
        <Icon
          mb="1"
          as={<MaterialIcons name="explore" />}
          color="white"
          size="xl"
        />
      );
      break;
    case "UploadCrop":
      renderItem = (
        <Icon
          mb="1"
          as={<MaterialIcons name="add" />}
          color="error.500"
          size="xl"
        />
      );
      break;
    case "Search":
      renderItem = (
        <Icon
          mb="1"
          as={<MaterialIcons name="search" />}
          color="white"
          size="xl"
        />
      );
      break;
    case "Settings":
      renderItem = (
        <Icon
          mb="1"
          as={<MaterialIcons name="settings" />}
          color="white"
          size="xl"
        />
      );
      break;

    default:
      renderItem = (
        <Icon
          mb="1"
          as={<MaterialIcons name="circle" />}
          color="white"
          size="sm"
        />
      );
      break;
  }

  return <>{renderItem}</>;
};
export default RenderIcon;
