import React, { useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Formik, Field, useFormik } from 'formik';
import * as Yup from 'yup';
import { checkIsMailValid, isValidPassword } from '../../helpers/check';

import { CAPTION, COLORS, FONTS, SHADOWS, SIZES } from '../../constants/theme';
import { CheckBox, Icon } from '@rneui/base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import textInput from '../../components/main/textInput';
import { checkValidIcon, eyeIcon } from '../../components/icons';
import { mainButton } from '../../components/buttons';
import { Image } from 'expo-image';
import verificationCodeModal from '../../components/modals/verificationCodeModal';
import { defApiFunc } from '../../api';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment/moment';
import encryptString from '../../helpers/encryptString';
import WebView from 'react-native-webview';

const SignUpScreen = ({ navigation }) => {
  //inputs
  const [registerValues, setRegisterValues] = useState({
    name: '',
    lastname: '',
    phone: '',
    email: '',
    password: '',
    password_confirmation: '',
    tckimlik: '',
    birthdate: '1995-12-17',
  });
  const [userCode, setUserCode] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Minimum 2 Karakter.').required('Zorunlu'),
    lastname: Yup.string().min(2, 'Minimum 2 Karakter.').required('Zorunlu'),
    email: Yup.string().email('Geçersiz email').required('Zorunlu'),
    password: Yup.string().min(6, 'Şifre en az 6 karakter olmalıdır.').required('Zorunlu'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Şifreler eşleşmiyor')
      .required('Zorunlu'),
    tckimlik: Yup.string().min(11, 'Minimum 11 Karakter.').required('Zorunlu'),
    phone: Yup.string().min(10, 'Minimum 10 Karakter.').required('Gerekli'),
  });

  //passVisibility
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);
  //verification code
  const [verificationCodeModalVisible, setVerificationCodeModalVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.white,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: SIZES.width * 0.15,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon size={28} name={'chevron-left'} type={'entypo'} />
        </TouchableOpacity>
      </View>
      <WebView
        source={{
          uri: 'https://osinif.com/register',
        }}
      />

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
