import { BODY2, H1, H3 } from "../../../constants";
import { COLORS, SHADOWS, SIZES } from "../../../constants/theme";
import { View, Text } from "react-native";
import TopBar from "../../../components/main/topBar";
import { useNavigation } from "@react-navigation/native";
import PieChart from "react-native-pie-chart";
import { useContext, useEffect } from "react";
import { defApiFunc } from "../../../api";
import { AuthContext } from "../../../context/AuthContext";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  console.log(userInfo);
  const widthAndHeight = 150;
  const series = [123, 321];
  const sliceColor = [COLORS.purple, COLORS.darkBlue];
  useEffect(() => {
    defApiFunc("getParagraphDash", {
      userid: userInfo?.ID,
    })
      .then((res) => {
        console.log(res?.data, "qwe");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
        alignItems: "center",
      }}
    >
      <View
        style={{
          marginTop: 20,
          ...SHADOWS.shadowOne,
          width: SIZES.width * 0.8,
          height: 250,
          alignItems: "center",
          backgroundColor: COLORS.white,
        }}
      >
        <View
          style={{
            width: "100%",
            borderBottomWidth: 2,
            borderBottomColor: COLORS.lightGrayFour,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              ...H3,
              paddingVertical: 8,
              fontSize: 16,
              color: COLORS.darkGray,
            }}
          >
            Eğitim Videoları
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            height: "82.5%",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
            coverRadius={0.45}
            coverFill={"#FFF"}
          />
          <View
            style={{
              flexDirection: "row",
              width: SIZES.width * 0.8,
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 15,
                  height: 7.5,
                  marginRight: 5,
                  backgroundColor: COLORS.darkBlue,
                }}
              />
              <Text
                style={{
                  ...BODY2,
                  fontSize: 12,
                  color: "#4F4F4F",
                }}
              >
                İzlenen Video Sayısı
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 15,
                  height: 7.5,
                  marginRight: 5,
                  backgroundColor: COLORS.purple,
                }}
              />
              <Text
                style={{
                  ...BODY2,

                  fontSize: 12,
                  color: "#4F4F4F",
                }}
              >
                Kalan Video Sayısı
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default HomeScreen;
