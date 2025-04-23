import { View, Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SHADOWS, SIZES } from "../../../constants/theme";
import { Image } from "expo-image";
const PurchasedListComp = ({ item, setSelected }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setSelected(item);
      }}
      style={{
        width: SIZES.width * 0.45,
        height: 120,
        backgroundColor: COLORS.white,
        borderColor: COLORS.blue,
        borderWidth: 1,
        ...SHADOWS.shadowTwo,
        marginBottom: 10,
        borderRadius: 8,
        alignItems: "center",
        alignSelf: "flex-start",
        marginHorizontal: 5,
        justifyContent: "space-around",
      }}
    >
      <Image
        contentFit={"contain"}
        style={{
          width: 120,
          height: 80,
        }}
        source={{
          uri:
            "https://online.sanalegitim.com.tr/assets/images/educations/" +
            item?.BRANCH +
            ".png",
        }}
      />
      <Text
        style={{
          ...FONTS.BODY3,
        }}
      >
        {item?.name ?? item?.NAME}
      </Text>
    </TouchableOpacity>
  );
};

export default PurchasedListComp;
