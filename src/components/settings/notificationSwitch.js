import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { Text, View } from "react-native";
import { Switch } from "@rneui/base";

const notificationSwitch = ({ title, value, setValue }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: SIZES.width * 0.8,
        marginBottom: 16,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          ...FONTS.BODY2,
          fontSize: 16,
          color: COLORS.black,
        }}
      >
        {title}
      </Text>
      <Switch
        color={"#1DC9A0"}
        value={value}
        onValueChange={() => setValue(!value)}
      />
    </View>
  );
};

export default notificationSwitch;
