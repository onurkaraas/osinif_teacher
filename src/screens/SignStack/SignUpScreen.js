import React, { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Formik, Field, useFormik } from "formik";
import * as Yup from "yup";
import { checkIsMailValid, isValidPassword } from "../../helpers/check";

import { CAPTION, COLORS, FONTS, SHADOWS, SIZES } from "../../constants/theme";
import { CheckBox, Icon } from "@rneui/base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import textInput from "../../components/main/textInput";
import { checkValidIcon, eyeIcon } from "../../components/icons";
import { mainButton } from "../../components/buttons";
import { Image } from "expo-image";
import verificationCodeModal from "../../components/modals/verificationCodeModal";
import { defApiFunc } from "../../api";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment/moment";
import encryptString from "../../helpers/encryptString";

const SignUpScreen = ({ navigation }) => {
  //inputs
  const [registerValues, setRegisterValues] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    password_confirmation: "",
    tckimlik: "",
    birthdate: "1995-12-17",
  });
  const [userCode, setUserCode] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, "Minimum 2 Karakter.").required("Zorunlu"),
    lastname: Yup.string().min(2, "Minimum 2 Karakter.").required("Zorunlu"),
    email: Yup.string().email("Geçersiz email").required("Zorunlu"),
    password: Yup.string()
      .min(6, "Şifre en az 6 karakter olmalıdır.")
      .required("Zorunlu"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Şifreler eşleşmiyor")
      .required("Zorunlu"),
    tckimlik: Yup.string().min(11, "Minimum 11 Karakter.").required("Zorunlu"),
    phone: Yup.string().min(10, "Minimum 10 Karakter.").required("Gerekli"),
  });

  //passVisibility
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);
  //verification code
  const [verificationCodeModalVisible, setVerificationCodeModalVisible] =
    useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.white,
      }}
    >
      <Formik
        initialValues={registerValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          defApiFunc("setMemberRegister", {
            tckimlik: values.tckimlik,
            name: values.name,
            lastname: values.lastname,
            phone: values.phone,
            email: values.email,
            password: encryptString(values.password),
            birthdate: moment(values.birthdate).format("DD.MM.YYYY"),
          }).then(
            (response) => {
              if (response.data[0].STYLE === "success") {
                setUserCode(response.data[0].DATA);
                defApiFunc("getTwoFactor", {
                  code: response.data[0].DATA,
                }).then(
                  (res) => {
                    setVerifyCode(res.data[0].VERIFY);
                    setVerificationCodeModalVisible(true);
                  },
                  (err) => {
                    console.log("err", err);
                  },
                );
              } else {
                alert(response.data[0].DATA);
              }
            },
            (err) => {
              console.log("err", err);
            },
          );
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <KeyboardAwareScrollView
            extraHeight={300}
            style={{
              flex: 1,
              backgroundColor: COLORS.primary,
            }}
            contentContainerStyle={{
              flexGrow: 1,
              width: SIZES.width,
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: SIZES.width * 0.925,
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,

                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: SIZES.width * 0.15,
                }}
              >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon size={28} name={"chevron-left"} type={"entypo"} />
                </TouchableOpacity>
              </View>
              <Image
                style={{
                  alignSelf: "center",
                  width: SIZES.width * 0.6,
                  height: 60,
                }}
                contentFit={"contain"}
                source={require("../../../assets/images/logo.png")}
              />
              <View
                style={{
                  width: SIZES.width * 0.15,
                }}
              />
            </View>
            <Text
              style={{
                ...CAPTION,
                fontSize: 24,
                marginBottom: 6,
                color: COLORS.black,
              }}
            >
              Kayıt Ol
            </Text>
            <Field
              component={textInput}
              label="İsim*"
              placeholder="İsminizi Giriniz"
              value={values.name}
              errorMessage={errors.name}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
            />
            <Field
              component={textInput}
              label="Soyisim*"
              placeholder="Soyisminizi Giriniz"
              value={values.lastname}
              onChangeText={handleChange("lastname")}
              onBlur={handleBlur("lastname")}
              errorMessage={errors.lastname}
            />

            <Field
              component={textInput}
              placeholder="(123) 456 78 90"
              label="Telefon Numarası"
              value={values.phone}
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              maxLength={10}
              keyboardType="phone-pad"
              errorMessage={errors.phone}
            />
            <Field
              component={textInput}
              placeholder="TC Kimlik Numaranızı Giriniz"
              label="TC Kimlik Numarası*"
              value={values.tckimlik}
              keyboardType="numeric"
              onChangeText={handleChange("tckimlik")}
              onBlur={handleBlur("tckimlik")}
              maxLength={11}
              errorMessage={errors.tckimlik}
            />
            {/*<Field*/}
            {/*  component={textInput}*/}
            {/*  placeholder="Doğum Tarihinizi Giriniz"*/}
            {/*  label="Doğum Tarihi*"*/}
            {/*  value={values.birthdate}*/}
            {/*  onChangeText={handleChange("birthdate")}*/}
            {/*  onBlur={handleBlur("birthdate")}*/}
            {/*  maxLength={11}*/}
            {/*  errorMessage={errors.birthdate}*/}
            {/*/>*/}
            <Text
              style={{
                ...FONTS.BODY3,
                width: SIZES.width * 0.84,
                zIndex: 1,
                color: COLORS.primaryDark,
                marginLeft: 4,
                marginBottom: 4,
                borderColor: "red",
              }}
            >
              Doğum Tarihi
            </Text>
            <TouchableOpacity
              onPress={() => setDatePickerVisible(true)}
              style={{
                backfaceVisibility: "hidden",
                ...SHADOWS.shadowOne,
                borderRadius: 8,
                width: SIZES.width * 0.86,
                height: 50,
                alignItems: "center",
                flexDirection: "row",
                paddingHorizontal: 12,
                backgroundColor: COLORS.white,
                borderBottomWidth: 0,
                marginBottom: SIZES.base,
                borderTopWidth: 0,
                borderRightWidth: 0,
                borderLeftWidth: 0,
              }}
            >
              <Text
                style={{
                  ...FONTS.BODY3,
                  color: COLORS.black,
                  marginLeft: 4,
                  fontSize: SIZES.body2,
                }}
              >
                {moment(registerValues.birthdate).format("DD-MM-YYYY")}
              </Text>
            </TouchableOpacity>
            <Field
              component={textInput}
              textContentType="emailAddress"
              value={values.email}
              placeholder="Mail Adresinizi Giriniz"
              label="E-mail (Kullanıcı Adı olarak kullanılacaktır.)*"
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              errorMessage={errors.email}
              rightIcon={checkValidIcon({
                checkedItem: values.email,
                check: checkIsMailValid,
              })}
            />
            <DateTimePickerModal
              isVisible={datePickerVisible}
              date={new Date(values.birthdate)}
              mode="date"
              accessibilityLanguage={"tr"}
              locale={"tr"}
              onConfirm={(date) => {
                setRegisterValues({
                  ...registerValues,
                  birthdate: date,
                });
                setDatePickerVisible(false);
              }}
              onCancel={() => setDatePickerVisible(false)}
            />
            <Field
              component={textInput}
              value={values.password}
              textContentType="password"
              label="Şifreniz*"
              placeholder="********"
              onChangeText={handleChange("password")}
              errorMessage={errors.password}
              secureTextEntry={secureTextEntry}
              rightIcon={eyeIcon({
                onPress: () => setSecureTextEntry(!secureTextEntry),
              })}
            />
            <Field
              component={textInput}
              textContentType="password"
              value={values.password_confirmation}
              label="Şifreniz Tekrar*"
              placeholder="********"
              onChangeText={handleChange("password_confirmation")}
              errorMessage={errors.password_confirmation}
              secureTextEntry={secureTextEntryConfirm}
              rightIcon={eyeIcon({
                onPress: () =>
                  setSecureTextEntryConfirm(!secureTextEntryConfirm),
              })}
            />

            {/*<TouchableOpacity*/}
            {/*  onPress={() => {*/}
            {/*    setAgreementOpen(!agreement);*/}
            {/*  }}*/}
            {/*  style={{*/}
            {/*    flexDirection: "row",*/}
            {/*    width: SIZES.width * 0.86,*/}
            {/*    alignItems: "center",*/}
            {/*    marginVertical: 10,*/}
            {/*    paddingLeft: 5,*/}
            {/*    backfaceVisibility: "hidden",*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <Text*/}
            {/*    style={{*/}
            {/*      ...BODY3,*/}
            {/*      fontSize: 14,*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    I agree to the{" "}*/}
            {/*    <Text*/}
            {/*      style={{*/}
            {/*        ...BODY4,*/}
            {/*        fontSize: 14,*/}
            {/*      }}*/}
            {/*    >*/}
            {/*      oSınıf*/}
            {/*    </Text>{" "}*/}
            {/*    <Text*/}
            {/*      onPress={() => {*/}
            {/*        setAgreementOpen(true);*/}
            {/*        setAgreementUrl({*/}
            {/*          title: "Privacy Policy",*/}
            {/*          url: "",*/}
            {/*        });*/}
            {/*      }}*/}
            {/*      style={{*/}
            {/*        color: COLORS.primary,*/}
            {/*      }}*/}
            {/*    >*/}
            {/*      Privacy policy*/}
            {/*    </Text>*/}
            {/*    **/}
            {/*  </Text>*/}
            {/*  <CheckBox*/}
            {/*    containerStyle={{*/}
            {/*      padding: 0,*/}
            {/*      margin: 0,*/}
            {/*      marginLeft: 5,*/}
            {/*    }}*/}
            {/*    onPress={() => setAgreement(!agreement)}*/}
            {/*    checked={agreement}*/}
            {/*    checkedColor={COLORS.primary}*/}
            {/*  />*/}
            {/*</TouchableOpacity>*/}

            <View
              style={{
                height: SIZES.height * 0.125,
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              {mainButton({
                text: "Kayıt Ol",
                onPress: () => {
                  handleSubmit();
                },
              })}
            </View>
          </KeyboardAwareScrollView>
        )}
      </Formik>
      {verificationCodeModal({
        userCode,
        verifyCode,
        isVisible: verificationCodeModalVisible,
        setIsVisible: setVerificationCodeModalVisible,
        navigation,
      })}
    </View>
  );
};

export default SignUpScreen;
