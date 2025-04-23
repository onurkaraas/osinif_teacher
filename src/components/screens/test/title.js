import { BODY3, COLORS } from "../../../constants/theme";
import { Text, View } from "react-native";

const Title = ({ text, color }) => {
  return (
    <View
      style={{
        marginTop: 10,
        marginLeft: 10,
        borderBottomColor: color,
        borderBottomWidth: 2,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          ...BODY3,
          fontSize: 16,
          paddingHorizontal: 5,
          color: COLORS.black,
        }}
      >
        {text}
      </Text>
    </View>
  );
};
export default Title;
