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
import { Icon } from "@rneui/base";

const saveButton = (props) => {
  const { onPress, borderColor, width, height, disabled } = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        height: 52,
        borderColor: borderColor ?? null,
        borderWidth: borderColor ? 1 : 0,
        width: width ?? SIZES.width * 0.6,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: disabled ? COLORS.gray : COLORS.green,
        zIndex: 1,
        justifyContent: "flex-end",
        backfaceVisibility: "hidden",
        ...SHADOWS.shadowTwo,
        flexDirection: "row",
      }}
      onPress={onPress}
    >
      <Text
        style={{
          textAlign: "center",
          position: "absolute",
          width: width ?? SIZES.width * 0.6,

          ...H3,
          fontSize: 20,
          color: COLORS.white,
        }}
      >
        {props.text}
      </Text>
      <Icon
        style={{
          paddingRight: 16,
        }}
        color={COLORS.white}
        name={"check-circle"}
        type={"feather"}
      />
    </TouchableOpacity>
  );
};

export default saveButton;
