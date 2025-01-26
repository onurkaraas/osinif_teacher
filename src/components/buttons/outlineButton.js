import { Text, TouchableOpacity } from "react-native";
import {
  BODY1,
  COLORS,
  longScreen,
  SHADOWS,
  SIZES,
} from "../../constants/theme";
import React from "react";

const outlineButton = (props) => {
  const { height, width, borderColor, disabled, onPress } = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        height: height ? height : longScreen ? 56 : 48,
        borderColor: borderColor ?? COLORS.primary,
        borderWidth: 1,
        width: width ?? SIZES.width * 0.86,
        borderRadius: 12,
        alignItems: "center",
        backgroundColor: disabled ? COLORS.gray : COLORS.white,
        zIndex: 1,
        justifyContent: "center",
        backfaceVisibility: "hidden",
        ...SHADOWS.shadowTwo,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          ...BODY1,
          color: COLORS.primary,
          textAlign: "center",
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};
export default outlineButton;
