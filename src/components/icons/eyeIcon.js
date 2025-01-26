import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { lightGrayOne } from "../../constants";
import React from "react";

const eyeIcon = (props) => {
  const { onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialCommunityIcons color={lightGrayOne} size={24} name={"eye"} />
    </TouchableOpacity>
  );
};

export default eyeIcon;
