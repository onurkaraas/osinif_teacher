import React from "react";
import { View, Text } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { BODY6, H1 } from "../../constants";
import { COLORS, SIZES } from "../../constants/theme";
import textInput from "../../components/main/textInput";
import { mainButton } from "../../components/buttons";

const ForgotPassScreen = ({ navigation: { goBack } }) => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingBottom: SIZES.height * 0.05,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text style={H1}>Forget Password</Text>

      <Text
        style={{
          ...BODY6,
        }}
      >
        Reset email will be send.
      </Text>

      <View
        style={{
          width: SIZES.width,
          height: SIZES.height * 0.45,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <View
          style={{
            alignItems: "center",
            flex: 0.4,
            justifyContent: "space-around",
          }}
        >
          {textInput({
            label: "Email",
            value: email,
            onChangeText: (text) => setEmail(text),
            keyboardType: "email-address",
          })}
        </View>

        {mainButton({
          text: "Send Reset Email",
          onPress: () => {},
          // disabled: !checkIsMailValid(email),
        })}
      </View>

      <View />
    </View>
  );
};
export default ForgotPassScreen;
