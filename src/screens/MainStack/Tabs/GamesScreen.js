import { BODY2, BODY3, BODY4, H1 } from "../../../constants";
import { COLORS, SHADOWS, SIZES } from "../../../constants/theme";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { useContext, useEffect, useState } from "react";
import Modal from "react-native-modal";
import { Icon } from "@rneui/base";
import languagePickerComp from "../../../components/modals/languagePickerComp";
import pickLanguageModal from "../../../components/modals/pickLanguageModal";
import { AuthContext } from "../../../context/AuthContext";
import getWords from "../../../api/game/getWords";
import { useIsFocused } from "@react-navigation/native";
const GamesScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [gameType, setGameType] = useState(0); // [0: Leblebi, 1: Hızlı Okuma Alıştırmaları]
  const { token } = useContext(AuthContext);
  const isFocused = useIsFocused();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: "flex-start",
      }}
    >
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          alignItems: "flex-start",
          width: SIZES.width,
          paddingBottom: 100,
        }}
      >
        <View
          style={{
            marginTop: 5,
            marginLeft: 10,
            borderBottomColor: COLORS.blue,
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
            Oyunlar
          </Text>
        </View>

        <LinearGradient
          colors={["#04046A", "#007991"]}
          style={styles.gradientContainer}
        >
          <Text
            style={{
              ...H1,
              fontSize: 22,
              color: COLORS.white,
            }}
          >
            Leblebi ( Kelime Ezber )
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: SIZES.width * 0.95,
              paddingVertical: 10,
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Image
              contentFit={"contain"}
              style={{
                width: 150,
                height: "100%",
              }}
              source={require("../../../../assets/images/games_1.png")}
            />
            <Text
              style={{
                ...BODY3,
                fontSize: 12,
                lineHeight: 14,
                color: COLORS.white,
                width: SIZES.width * 0.95 - 155,
              }}
            >
              Yabancı dili öğrenenlerin en çok karşılaştığı 1000 kelimeyi
              sizlere sunuyoruz. Akademik olmayan yazıların yaklaşık %85-90’ı bu
              1000 kelimeden oluşuyor. Yani bu 1000 kelimeyi ezberleyen/bilen
              biri akademik olmayan yazı, haber, video, film vb. şeylerin %85
              ile %90’ınını kesin olarak okuyup ya da izleyip anlayacaktır.
            </Text>
          </View>
          <Text
            style={{
              ...BODY3,
              fontFamily: "Poppins_400Regular_Italic",
              fontSize: 12,
              paddingHorizontal: 10,
              lineHeight: 14,

              color: COLORS.white,
            }}
          >
            Leblebi ile günlük hayatta en sık kullanılan 1000 kelimeyi size
            yolda, otobüste veya dinlenirken ezberletmeyi hedefliyoruz. Leblebi
            bir yarış değil, o yüzden bilmediğiniz kelimeleri PAS diyerek geçin.
            Daha sonra girdiğinizde kaldığınız yerden başlayabilirsiniz.
          </Text>
          <View
            style={{
              width: SIZES.width * 0.9,
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setGameType(0);
                setVisible(true);
              }}
              style={{
                backgroundColor: COLORS.orange,
                paddingHorizontal: 12.5,
                borderRadius: 24,
                marginTop: 8,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  ...BODY3,
                  paddingHorizontal: 12.5,
                  paddingVertical: 6,
                  color: COLORS.white,
                }}
              >
                Başla
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={["#2E2E8A", "#5656EFF7"]}
          style={styles.gradientContainer}
        >
          <Text
            style={{
              ...H1,
              fontSize: 22,
              color: COLORS.white,
            }}
          >
            Hızlı Okuma Alıştırmaları
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: SIZES.width * 0.95,
              paddingVertical: 10,
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Image
              contentFit={"contain"}
              style={{
                width: 150,
                height: "100%",
              }}
              source={require("../../../../assets/images/games_1.png")}
            />
            <Text
              style={{
                ...BODY3,
                fontSize: 12,
                lineHeight: 14,

                color: COLORS.white,
                width: SIZES.width * 0.95 - 155,
              }}
            >
              Egzersizleri dudaklarınızı kıpırdatmadan gözlerinizle takip ederek
              uygulamalısınız. Bu egzersiler ile hem yabancı dil kelime
              haznenizi, hem de göz kaslarınızı geliştirecektir.
            </Text>
          </View>
          <Text
            style={{
              ...BODY3,
              fontFamily: "Poppins_400Regular_Italic",
              fontSize: 12,
              paddingHorizontal: 10,
              lineHeight: 14,

              color: COLORS.white,
            }}
          >
            Kelime grupları belirli sürelerde değişecektir. 4 farklı hız
            seçeneği ile sıralı yada rastgele seçeneği ile egzersizlere
            başlayabilirsiniz.
          </Text>
          <View
            style={{
              width: SIZES.width * 0.9,
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                getWords({
                  lang: "en",
                }).then((response) => {
                  if (response.data) {
                    console.log("response", response.data);
                    navigation.navigate("FastReadGame", {
                      data: response.data,
                      lang: "TR",
                    });
                    setIsVisible(false);
                  }
                });
              }}
              style={{
                backgroundColor: COLORS.orange,
                paddingHorizontal: 12.5,
                borderRadius: 24,
                marginTop: 4,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  ...BODY3,
                  paddingHorizontal: 12.5,
                  paddingVertical: 6,
                  color: COLORS.white,
                }}
              >
                Oyuna Başla
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>
      {pickLanguageModal({
        isVisible: visible,
        setIsVisible: setVisible,
        navigation: navigation,
        gameType: gameType,
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  gradientContainer: {
    width: SIZES.width * 0.95,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 10,
    alignItems: "center",
  },
});

export default GamesScreen;
