import { Text, Touchable, TouchableOpacity, View } from "react-native";
import { BODY2, COLORS, SIZES } from "../../constants/theme";
import { Image } from "expo-image";
import { Icon } from "@rneui/base";
import { defApiFunc } from "../../api";

const languagePickerComp = ({ title, flag, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        backfaceVisibility: "hidden",
        justifyContent: "space-between",
        width: SIZES.width * 0.7,
        borderRadius: 8,
        height: 60,
        borderWidth: 1,
        borderColor: "#F2F2F2",
        backgroundColor: "#F8F8F8",
        alignItems: "center",
        paddingHorizontal: 10,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          contentFit={"cover"}
          style={{
            width: 32,
            height: 24,
            marginRight: 10,
            backgroundColor: "#DF101B",
          }}
          source={flag}
        />
        <Text
          style={{
            ...BODY2,
            fontSize: 18,
            color: COLORS.darkGray,
          }}
        >
          {title}
        </Text>
      </View>
      <Icon size={22} type={"feather"} name={"arrow-right"} />
    </TouchableOpacity>
  );
};

export default languagePickerComp;
