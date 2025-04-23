import { Text, TouchableOpacity, View } from "react-native";
import { BODY4, COLORS, H1, SHADOWS, SIZES } from "../../../constants/theme";
import { isTablet } from "../../../helpers/deviceInfo";
import { defApiFunc } from "../../../api";
import moment from "moment/moment";
import WebView from "react-native-webview";

const ExamListComp = ({
  token,
  onPress,
  item,
  text,
  firstDate,
  secondDate,
  navigation,
}) => {
  console.log(item.DESCRIPTION);
  return (
    <View
      style={{
        ...SHADOWS.shadowOne,
        paddingVertical: 5,
        marginLeft: SIZES.width * 0.0125,
        width: isTablet() ? 200 : SIZES.width * 0.475,
        backgroundColor: "#fff",
        marginBottom: 10,
        borderRadius: 8,
      }}
    >
      <View
        style={{
          paddingHorizontal: 10,
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            ...H1,
            marginBottom: 2.5,
            fontSize: 18,
            color: COLORS.primaryDark,
          }}
        >
          {item.NAME}
        </Text>

        <WebView
          originWhitelist={["*"]}
          source={{
            html:
              `<!DOCTYPE html><html><head> <meta name="viewport" content="width=device-width" initial-scale="1.00" maximum-scale="1.0"></head>
                    <style>body { font-size:100%; word-wrap: break-word; overflow-wrap: break-word; }</style>` +
              `<body style="font-family: Verdana" > 
                    ${item?.DESCRIPTION}
                    </body></html>`,
          }}
          style={{
            backgroundColor: "transparent",
            height: 120,
            width: isTablet() ? 180 : SIZES.width * 0.475 - 40,
          }}
        />
        <Text
          style={{
            ...H1,
            fontSize: 14,
            color: "#C63A0D",
          }}
        >
          {text}: {item.C_CORRECT} / {item.C_TOTAL}
        </Text>
        <TouchableOpacity
          onPress={onPress}
          style={{
            marginTop: 10,
            backgroundColor: COLORS.primaryDark,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 5,
          }}
        >
          <Text
            style={{
              ...BODY4,
              fontSize: 12,
              color: COLORS.white,
            }}
          >
            İncele
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          borderTopColor: COLORS.softGray,
          borderTopWidth: 1,
          marginTop: 10,
          paddingTop: 5,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 5,
        }}
      >
        <Text
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={{
            ...BODY4,
            fontSize: 12,
            color: COLORS.softGray,
          }}
        >
          {moment(item[firstDate]).format("DD MMM YY")}
        </Text>
        {secondDate && (
          <Text
            adjustsFontSizeToFit={true}
            numberOfLines={1}
            style={{
              ...BODY4,
              fontSize: 12,
              color: COLORS.softGray,
            }}
          >
            {" - "} {moment(item[secondDate]).format("DD MMM YY")}
          </Text>
        )}
      </View>
    </View>
  );
};
export default ExamListComp;
