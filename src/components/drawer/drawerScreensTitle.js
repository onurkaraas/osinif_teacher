import { Text, View } from "react-native";
import { COLORS, FONTS } from "../../constants/theme";

const drawerScreensTitle = ({ title, style }) => {
  return (
    <View
      style={{
        paddingLeft: 20,
        marginBottom: 20,
        ...style,
      }}
    >
      <View
        style={{
          borderBottomWidth: 2,
          borderBottomColor: COLORS.blue,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ ...FONTS.BODY1, fontSize: 14 }}>{title}</Text>
      </View>
    </View>
  );
};

export default drawerScreensTitle;
