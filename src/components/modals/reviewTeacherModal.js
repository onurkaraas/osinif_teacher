import { Text, TouchableOpacity, View } from "react-native";
import { BODY3, BODY4, COLORS, SHADOWS, SIZES } from "../../constants/theme";
import { AirbnbRating, Icon } from "@rneui/base";
import { Rating } from "@rneui/themed";

import Modal from "react-native-modal";
import profileInput from "../main/profileInput";
import { mainButton } from "../buttons";
import { defApiFunc } from "../../api";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const reviewTeacherModal = ({
  isVisible,
  setIsVisible,
  selectedChapter,
  token,
}) => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
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
            paddingVertical: 16,
            paddingBottom: 32,
            width: SIZES.width * 0.9,
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
          <KeyboardAwareScrollView
            contentContainerStyle={{
              alignItems: "center",
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
                fontSize: 22,
                color: COLORS.black,
                marginBottom: 20,
              }}
            >
              Eğitmene Puan Ver
            </Text>
            <Text
              style={{
                ...BODY3,
                fontSize: 16,
                color: "#9098A3",
                marginBottom: 24,
                textAlign: "center",
              }}
            >
              İzlemiş olduğunuz dersteki eğitimciye puan verin.
            </Text>
            <AirbnbRating
              count={5}
              defaultRating={0}
              size={30}
              onFinishRating={(value) => {
                setRating(value);
              }}
              showRating={false}
              selectedColor={COLORS.primaryDark}
              unSelectedColor={"#9098A3"}
            />
            <View
              style={{
                marginVertical: 20,
              }}
            >
              {profileInput({
                placeholder: "Mesajınız",
                height: 120,
                multiline: true,
                value: message,
                onChangeText: (text) => {
                  setMessage(text);
                },
                width: SIZES.width * 0.8,
              })}
            </View>
            {mainButton({
              text: "Gönder",
              onPress: () => {
                defApiFunc("setUserStars", {
                  startype: "1",
                  source: "",
                  related: selectedChapter.TEACHER_CODE,
                  star: rating,
                  description: "",
                  token: token,
                }).then(
                  (res) => {
                    setIsVisible(false);
                    console.log(res.data);
                  },
                  (err) => {
                    console.log(err);
                  },
                );
              },
            })}
          </KeyboardAwareScrollView>
        </View>
      </Modal>
    </View>
  );
};
export default reviewTeacherModal;
