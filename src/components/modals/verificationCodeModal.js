import { Text, TouchableOpacity, View, StyleSheet, Alert } from "react-native";
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
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useState } from "react";
import { defApiFunc } from "../../api";
const verificationCodeModal = ({
  isVisible,
  setIsVisible,
  userCode,
  verifyCode,
  navigation,
}) => {
  const CELL_COUNT = 4;
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
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
            width: SIZES.width * 0.85,
            borderRadius: 20,
            paddingBottom: 30,
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
            Kod Doğrulama
          </Text>
          <Text
            style={{
              ...BODY3,
              fontSize: 16,
              color: COLORS.darkGray,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Aşağıdaki kodu alana giriniz
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
            {verifyCode}
          </Text>
          <CodeField
            ref={ref}
            autoFocus={true}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[
                  styles.cell,
                  isFocused && styles.focusCell,
                  symbol && styles.filledCell,
                ]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
          {mainButton({
            text: "Gönder",
            width: "95%",
            backgroundColor: "#445286",
            onPress: () => {
              if (parseInt(value) === parseInt(verifyCode)) {
                defApiFunc("setTwoFactor", {
                  code: userCode,
                }).then((res) => {
                  console.log("res", res.data);
                  if (res.data[0].USERID) {
                    Alert.alert(
                      "Başarılı",
                      "Kod doğrulandı,Hesabınızı kullanmaya başlayabilirsiniz.",
                      [
                        {
                          text: "Tamam",
                          onPress: () => {
                            setIsVisible(false);
                            navigation?.canGoBack()
                              ? navigation?.goBack()
                              : navigation?.navigate("SignInScreen");
                          },
                        },
                      ],
                    );
                  }
                });
              } else {
                console.log("value", value, verifyCode);
                Alert.alert("Hata", "Kod hatalı, lütfen tekrar deneyiniz.");
              }
            },
          })}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.softGray,
    alignItems: "center",
  },
  codeFieldRoot: { marginTop: 0, marginBottom: 20 },
  cell: {
    width: SIZES.width * 0.125,
    height: SIZES.width * 0.125,
    lineHeight: 50,
    fontSize: 24,
    color: COLORS.black,
    borderRadius: 14,
    borderWidth: 2,
    marginHorizontal: 4,
    borderColor: "rgba(0,0,0,0.2)",
    ...SHADOWS.shadowOne,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  focusCell: {
    borderColor: "rgba(0,0,0,0.5)",
  },
  filledCell: {
    borderColor: COLORS.primaryDark,
  },
});

export default verificationCodeModal;
