import { View, Text, TouchableOpacity, Alert } from "react-native";
import { BODY3, COLORS, FONTS } from "../../constants/theme";
import { useContext, useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import profileInput from "../../components/main/profileInput";
import saveButton from "../../components/buttons/saveButton";
import { AuthContext } from "../../context/AuthContext";
import { defApiFunc } from "../../api";
import updateProfile from "../../api/user/updateProfile";
import DrawerScreensTitle from "../../components/drawer/drawerScreensTitle";

const GoalsScreen = ({ navigation }) => {
  const { userInfo, user, setIsProfileUpdated } = useContext(AuthContext);
  const [values, setValues] = useState({
    video: 0,
    question: 0,
    paragraph: 0,
  });
  const handleChanges = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };
  console.log(userInfo.BIRTHDATE.replaceAll("-", "."));
  useEffect(() => {
    if (userInfo) {
      setValues({
        video: userInfo.TARGET_VIDEO,
        question: userInfo.TARGET_QUESTION,
        paragraph: userInfo.TARGET_PARAGRAPH,
      });
    }
  }, [userInfo]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        paddingTop: 10,
      }}
    >
      <DrawerScreensTitle
        style={{
          paddingLeft: 0,
        }}
        title={"Hedeflerim"}
      />

      <KeyboardAwareScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 10,
          alignItems: "center",
        }}
      >
        {profileInput({
          label: "Video",
          placeholder: "",
          value: values.video.toString(),
          keyboardType: "number-pad",
          onChangeText: (text) => handleChanges("video", text),
        })}
        {profileInput({
          label: "Soru",
          placeholder: "",
          keyboardType: "number-pad",
          value: values.question.toString(),
          onChangeText: (text) => handleChanges("question", text),
        })}
        {profileInput({
          label: "Paragraf",
          keyboardType: "number-pad",
          placeholder: "",
          value: values.paragraph.toString(),
          onChangeText: (text) => handleChanges("paragraph", text),
        })}
        <View
          style={{
            marginTop: 20,
          }}
        >
          {saveButton({
            text: "Kaydet",
            onPress: () => {
              updateProfile(user.USERID, {
                videoInput: parseInt(values.video),
                questionInput: parseInt(values.question),
                paragraphInput: parseInt(values.paragraph),
              }).then(
                (res) => {
                  if (res.data[0].STYLE !== "error") {
                    console.log(res.data);
                    setIsProfileUpdated(true);
                    Alert.alert(
                      "Başarılı",
                      res.data[0].MESSAGE ??
                        "Hedefleriniz başarıyla güncellendi",
                      [
                        {
                          text: "Tamam",
                          style: "cancel",
                        },
                      ],
                    );
                  } else {
                    alert("Hedefleriniz güncellenirken bir hata oluştu");
                  }
                },
                (err) => {
                  console.log(err);
                },
              );
            },
          })}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default GoalsScreen;
