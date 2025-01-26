import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import {
  BODY1,
  COLORS,
  H3,
  H_BOLD,
  longScreen,
  SHADOWS,
  SIZES,
} from "../../constants/theme";

const mainButton = (props) => {
  const { onPress, borderColor, width, height, disabled, backgroundColor } =
    props;
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        height: 48,
        borderColor: borderColor ?? null,
        borderWidth: borderColor ? 1 : 0,
        width: width ?? SIZES.width * 0.8,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: backgroundColor
          ? backgroundColor
          : disabled
            ? COLORS.gray
            : COLORS.primaryDark,
        zIndex: 1,
        justifyContent: "center",
        backfaceVisibility: "hidden",
        ...SHADOWS.shadowTwo,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          textAlign: "center",
          ...H3,
          fontSize: 18,
          color: COLORS.white,
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default mainButton;
