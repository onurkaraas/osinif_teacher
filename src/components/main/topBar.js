import { TouchableOpacity, View } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import { Image } from "expo-image";
import { Icon } from "@rneui/base";
import React from "react";
const TopBar = (navigation) => {
  return (
    <View
      style={{
        width: SIZES.width,
        height: 50,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: COLORS.primaryDark,
        paddingHorizontal: 15,
      }}
    >
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Icon name={"menu"} color={"white"} />
      </TouchableOpacity>
      <Image
        contentFit={"contain"}
        source={require("../../../assets/images/logoW.png")}
        style={{
          width: SIZES.width * 0.7,
          height: 37.5,
        }}
      />
      <Icon
        type={"ionicon"}
        name="notifications-outline"
        size={24}
        color="white"
      />
    </View>
  );
};
export default TopBar;
