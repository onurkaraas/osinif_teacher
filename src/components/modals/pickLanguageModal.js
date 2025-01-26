import { Text, TouchableOpacity, View } from "react-native";
import { BODY3, BODY4, COLORS, SHADOWS, SIZES } from "../../constants/theme";
import { Icon } from "@rneui/base";
import languagePickerComp from "./languagePickerComp";
import Modal from "react-native-modal";
import getWords from "../../api/game/getWords";
const pickLanguageModal = ({
  gameType,
  isVisible,
  setIsVisible,
  navigation,
}) => {
  return (
    <View>
      <Modal
        backdropColor={"#000"}
        backdropOpacity={0}
        visible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        animationType="slideInUp"
        onRequestClose={() => setIsVisible(false)}
        style={{
          margin: 0,
          flex: 1,
          zIndex: 22,
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.7)",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            alignItems: "center",
            paddingBottom: 24,
            paddingVertical: 12,
            width: SIZES.width * 0.8,
            borderRadius: 20,
            paddingHorizontal: 16,
            backgroundColor: "white",
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowOpacity: 0.5,
            shadowRadius: 13,
            elevation: 3,

            shadowColor: "#fff",
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity onPress={() => setIsVisible(false)}>
              <Icon name={"x"} size={24} type={"feather"} />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              ...BODY4,
              fontSize: 24,
              color: COLORS.black,
              marginBottom: 10,
            }}
          >
            Dil Seçimi
          </Text>
          <Text
            style={{
              ...BODY3,
              fontSize: 16,
              color: COLORS.darkGray,
              marginBottom: 16,
            }}
          >
            Başlamak istediğiniz dili seçiniz.
          </Text>
          {languagePickerComp({
            title: "İngilizce",
            flag: require("../../../assets/icons/flags/gb.png"),
            onPress: () => {
              getWords({
                lang: "en",
              }).then((response) => {
                if (response.data) {
                  console.log("response", response.data);
                  navigation.navigate(
                    gameType === 0 ? "WordGame" : "FastReadGame",
                    {
                      data: response.data,
                      lang: "EN",
                    },
                  );
                  setIsVisible(false);
                }
              });
            },
          })}
          {languagePickerComp({
            title: "Yunanca",
            flag: require("../../../assets/icons/flags/gr.png"),
            lang: "gr",

            onPress: () => {
              getWords({
                lang: "gr",
              }).then((response) => {
                if (response.data) {
                  console.log("response", response.data);
                  navigation.navigate(
                    gameType === 0 ? "WordGame" : "FastReadGame",
                    {
                      data: response.data,
                      lang: "GR",
                    },
                  );
                  setIsVisible(false);
                }
              });
            },
          })}
          {languagePickerComp({
            title: "Almanca",
            lang: "de",
            flag: require("../../../assets/icons/flags/de.png"),
            onPress: () => {
              getWords({
                lang: "de",
              }).then((response) => {
                if (response.data) {
                  console.log("response", response.data);
                  navigation.navigate(
                    gameType === 0 ? "WordGame" : "FastReadGame",
                    {
                      data: response.data,
                      lang: "DE",
                    },
                  );
                  setIsVisible(false);
                }
              });
            },
          })}
          {gameType === 1 &&
            languagePickerComp({
              title: "Türkçe",
              lang: "tr",
              flag: require("../../../assets/icons/flags/tr.png"),
              onPress: () => {
                getWords({
                  lang: "tr",
                }).then((response) => {
                  if (response.data) {
                    console.log("response", response.data);
                    navigation.navigate(
                      gameType === 0 ? "WordGame" : "FastReadGame",
                      {
                        data: response.data,
                        lang: "TR",
                      },
                    );
                    setIsVisible(false);
                  }
                });
              },
            })}
        </View>
      </Modal>
    </View>
  );
};
export default pickLanguageModal;
