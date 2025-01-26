import { Alert, Text, TouchableOpacity, View } from "react-native";
import {
  BODY3,
  BODY4,
  COLORS,
  FONTS,
  SHADOWS,
  SIZES,
} from "../../constants/theme";
import { Icon, Input } from "@rneui/base";
import Modal from "react-native-modal";
import { mainButton } from "../buttons";
import { defApiFunc } from "../../api";
import encryptString from "../../helpers/encryptString";
import decryptString from "../../helpers/decryptString";
const forgotPassModal = ({ isVisible, setIsVisible, email, setEmail }) => {
  const sendPassword = () => {
    defApiFunc("sendPassword", {
      email: email,
    }).then((res) => {
      Alert.alert("Başarılı", `Şifreniz ${decryptString(res[0].PASSWORD)}`, [
        {
          text: "Tamam",
          onPress: () => setIsVisible(false),
        },
      ]);
    });
  };
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
            Parolamı Unuttum
          </Text>
          <Text
            style={{
              ...BODY3,
              fontSize: 16,
              color: COLORS.darkGray,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Sistemde kayıtlı mail adresinizi giriniz.
            {/*Bilgileriniz kayıtlı cep*/}
            {/*telefonunuza gönderilecektir.*/}
          </Text>
          <Input
            containerStyle={{
              marginBottom: 20,
              borderWidth: 0,
              borderRadius: 8,
              height: 50,
              borderColor: "rgba(0,0,0,0.1)",
            }}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor={"rgba(0,0,0,0.3)"}
            inputContainerStyle={{
              width: "100%",
              height: 50,
              borderWidth: 1,
              borderRadius: 8,
              borderColor: "rgba(0,0,0,0.1)",
              paddingHorizontal: 10,
            }}
            style={{
              ...FONTS.BODY3,
            }}
            inputStyle={{
              color: COLORS.darkGray,
              ...FONTS.BODY3,
              borderBottomWidth: 0,
              fontSize: 16,
            }}
            placeholder={"E-posta Adresi"}
          />
          {mainButton({
            text: "Gönder",
            width: "95%",
            backgroundColor: "#445286",
            onPress: () => {
              sendPassword();
            },
          })}
        </View>
      </Modal>
    </View>
  );
};
export default forgotPassModal;
