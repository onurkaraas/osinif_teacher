import React from "react";
import { View, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import { Icon } from "@rneui/base";

const backButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          borderColor: COLORS.black,
        }}
      >
        <Icon
          color={COLORS.gray}
          type={"entypo"}
          name={"chevron-left"}
          size={24}
        />
      </View>
    </TouchableOpacity>
  );
};

export default backButton;
