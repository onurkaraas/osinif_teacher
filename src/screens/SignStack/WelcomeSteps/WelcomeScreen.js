import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  black,
  BODY3,
  COLORS,
  H_BOLD,
  SHADOWS,
  SIZES,
} from "../../../constants/theme";
import AppIntroSlider from "react-native-app-intro-slider";
import { Image } from "expo-image";
import { isAndroid } from "../../../helpers/check";

const WelcomeScreen = () => {
  let navigation = useNavigation();
  const [page, setPage] = React.useState(0);

  let slides = [
    {
      image: require("../../../../assets/images/tuto_1.png"),
      text: "oSınıf; 5, 6 ve 7. sınıf, 9, 10 ve 11. sınıf, TYT, AYT, LGS, KPSS, DGS, ALES, MSÜ, YDS, YÖKDİL, IELTS, TOEFL gibi akademik ve sınav süreci odaklı eğitim gibi pek çok konspette içerik barındırmaktadır.",
      title: "Eğitim artık çok kolay",
      step: 1,
    },
    {
      image: require("../../../../assets/images/tuto_2.png"),
      title: "oSınıf",
      text: "İlerlemeye uyum sağlayın ve teknolojinin eğitim sektöründeki değişimlere ayak uydurun.",
    },
    {
      image: require("../../../../assets/images/tuto_3.png"),
      text: "Sanal gerçeklik ile keşfedin ve  dijital ortamlarda öğrenme deneyimini yaşayın.",
      title: "oSınıf",
    },
  ];
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <AppIntroSlider
        style={{
          flex: 1,
          flexDirection: "row",
        }}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: COLORS.primary,
        }}
        nextLabel={"Atla"}
        type={"fullscreen"}
        data={slides}
        onDone={() => {
          navigation.navigate("WelcomeScreen");
        }}
        renderPrevButton={() => {
          return (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.white,
                backfaceVisibility: "hidden",
                borderRadius: 12,
              }}
            >
              <Text
                style={{
                  ...H_BOLD,
                  paddingHorizontal: 16,
                  paddingVertical: 4,
                  fontSize: 20,
                }}
              >
                Geri
              </Text>
            </View>
          );
        }}
        renderNextButton={() => {
          return (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.white,
                backfaceVisibility: "hidden",
                borderRadius: 12,
              }}
            >
              <Text
                style={{
                  ...H_BOLD,
                  paddingHorizontal: 16,
                  paddingVertical: 4,
                  fontSize: 20,
                }}
              >
                İleri
              </Text>
            </View>
          );
        }}
        renderDoneButton={() => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("SignInScreen")}
              style={{
                ...SHADOWS.shadowOne,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.white,
                backfaceVisibility: "hidden",
                borderRadius: 12,
              }}
            >
              <Text
                style={{
                  ...H_BOLD,
                  paddingVertical: 4,
                  paddingHorizontal: 16,
                  fontSize: 20,
                }}
              >
                Bitir
              </Text>
            </TouchableOpacity>
          );
        }}
        onSlideChange={(index) => {
          setPage(index);
        }}
        showSkipButton={true}
        renderSkipButton={() => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("SignInScreen")}
              style={{
                ...SHADOWS.shadowOne,
                alignItems: "center",
                position: "absolute",
                justifyContent: "center",
                backgroundColor: COLORS.primaryDark,
                zIndex: 999,
                left: SIZES.width * 0.75,
                bottom: isAndroid() ? SIZES.height * 0.85 : SIZES.height * 0.75,
                backfaceVisibility: "hidden",
                borderRadius: 12,
              }}
            >
              <Text
                style={{
                  ...H_BOLD,
                  paddingHorizontal: 16,
                  paddingVertical: 4,
                  fontSize: 20,
                  color: COLORS.white,
                }}
              >
                Geç
              </Text>
            </TouchableOpacity>
          );
        }}
        showNextButton={true}
        showPrevButton={true}
        activeDotStyle={{
          backgroundColor: COLORS.primaryDark,
          width: 75,
          bottom: SIZES.height * 0.05,
          height: 28,
          borderRadius: 15,
        }}
        dotStyle={{
          height: 28,
          width: 28,
          bottom: SIZES.height * 0.05,
          borderRadius: 16,
          backgroundColor: COLORS.lightGrayOne,
        }}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                flex: 1,
                width: SIZES.width,
                alignItems: "center",
                backgroundColor: COLORS.primary,
                paddingBottom: SIZES.height * 0.15,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    marginTop: SIZES.height * 0.125,
                    width: SIZES.width,
                    height: SIZES.height * 0.3,
                  }}
                  contentFit={"contain"}
                  source={item.image}
                />
              </View>

              <View
                style={{
                  marginTop: 50,
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <Text
                  style={{
                    ...H_BOLD,
                    fontSize: 28,
                    textAlign: "center",
                    marginBottom: SIZES.height * 0.02,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    ...BODY3,
                    color: black,
                    paddingHorizontal: SIZES.width * 0.1,
                    textAlign: "center",
                  }}
                >
                  {item.text}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};
export default WelcomeScreen;
