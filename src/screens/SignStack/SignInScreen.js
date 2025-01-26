import React, { useContext, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { CAPTION, CAPTION3, COLORS, H3, SIZES } from '../../constants/theme';

import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../context/AuthContext';
import * as Yup from 'yup';
import { Field, Formik } from 'formik';
import textInput from '../../components/main/textInput';
import { eyeIcon } from '../../components/icons';
import { mainButton } from '../../components/buttons';
import { Image } from 'expo-image';
import forgotPassModal from '../../components/modals/forgotPassModal';
import Spinner from 'react-native-loading-spinner-overlay';
const SignInScreen = ({ navigation: { goBack } }) => {
    const { signIn, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [forgotVisible, setForgotVisible] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');

    const initialValues = {
        email: 'filizpinar@zubeydehanim.com.tr',
        password: '9142',
    };
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const navigation = useNavigation();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(/[a-zA-Z]/, 'Password must contain a letter')
            .matches(/\d/, 'Password must contain a number')
            .required('Required'),
    });
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: COLORS.primary,
            }}
        >
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => console.log(values)}
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
                        showsVerticalScrollIndicator={false}
                        style={{
                            flex: 1,
                        }}
                        contentContainerStyle={{
                            flexGrow: 1,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingTop: SIZES.height * 0.05,
                        }}
                    >
                        <View>
                            <Image
                                style={{
                                    width: SIZES.width * 0.7,
                                    height: 90,
                                }}
                                contentFit={'contain'}
                                source={require('../../../assets/images/logo.png')}
                            />
                        </View>

                        <View
                            style={{
                                width: SIZES.width,
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    ...CAPTION,
                                    fontSize: 24,
                                    marginBottom: 24,
                                    color: COLORS.black,
                                }}
                            >
                                Giriş Yap
                            </Text>
                            <Field
                                component={textInput}
                                placeholder="Mail Adresinizi Giriniz"
                                label="E-mail (Kullanıcı Adı olarak kullanılacaktır.)"
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                keyboardType="email-address"
                            />

                            <View
                                style={{
                                    alignItems: 'flex-end',
                                }}
                            >
                                <Field
                                    component={textInput}
                                    label="Şifreniz"
                                    placeholder="********"
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    secureTextEntry={secureTextEntry}
                                    rightIcon={eyeIcon({
                                        onPress: () =>
                                            setSecureTextEntry(
                                                !secureTextEntry
                                            ),
                                    })}
                                    keyboardType="default"
                                />

                                <TouchableOpacity
                                    onPress={() => setForgotVisible(true)}
                                    style={{
                                        marginTop: 12,
                                        marginBottom: 18,
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...CAPTION3,
                                            fontSize: 14,
                                            color: COLORS.red,
                                        }}
                                    >
                                        Parolamı Unuttum
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {mainButton({
                                text: 'Giriş Yap',
                                onPress: () => {
                                    setLoading(true);
                                    signIn({
                                        username: values.email,
                                        password: values.password,
                                        setPageLoading: setLoading,
                                    });
                                },
                            })}
                        </View>
                        <View
                            style={{
                                alignItems: 'center',
                                marginBottom: 18,
                            }}
                        >
                            <Text
                                style={{
                                    ...H3,
                                    fontSize: 16,
                                    color: COLORS.gray,
                                }}
                            >
                                Henüz üye değil misiniz?{' '}
                                <Text
                                    onPress={() =>
                                        navigation.navigate('SignUpScreen')
                                    }
                                    style={{
                                        color: COLORS.primaryDark,
                                    }}
                                >
                                    Kayıt Ol
                                </Text>
                            </Text>
                        </View>
                    </KeyboardAwareScrollView>
                )}
            </Formik>
            {forgotPassModal({
                isVisible: forgotVisible,
                setIsVisible: setForgotVisible,
                setEmail: setForgotEmail,
                email: forgotEmail,
            })}
            {loading && <Spinner visible={true} />}
        </View>
    );
};

export default SignInScreen;
