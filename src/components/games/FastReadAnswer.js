import { Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS, SHADOWS, SIZES } from "../../constants/theme";
import { getRandomNumber } from "../../helpers/check";

const FastReadAnswer = ({ text, prText, showedAnswer, index, style }) => {
  return (
    <View
      style={{
        backfaceVisibility: "hidden",
        borderRadius: 10,
        ...SHADOWS.shadowOne,
        backgroundColor: COLORS.lightGrayOne,
        justifyContent: "center",
        alignItems: "center",
        // length > 10 ? -40, -SIZES.width * 0.4 : SIZES.width * 0.125,
        ...style,
      }}
    >
      <Text
        style={{
          ...FONTS.H3,
          textAlign: "center",
          paddingHorizontal: 20,
          paddingVertical: 10,
          color: showedAnswer === index ? COLORS.black : COLORS.lightGrayOne,
        }}
      >
        {text} {prText ? "\n" : ""}
        {prText}
      </Text>
    </View>
  );
};

export default FastReadAnswer;
