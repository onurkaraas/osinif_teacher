import { View, Text, Alert } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import profileInput from '../../components/main/profileInput';
import PickerWithLabel from '../../components/main/pickerWithLabel';
import { mainButton } from '../../components/buttons';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useState } from 'react';
import { defApiFunc } from '../../api';
import DrawerScreensTitle from '../../components/drawer/drawerScreensTitle';

const ContactUsScreen = ({ navigation }) => {
  const { userInfo, token } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [open, setOpen] = useState(false);
  console.log(selectedSubject);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        paddingTop: 10,
        backgroundColor: COLORS.primary,
      }}>
      <DrawerScreensTitle
        style={{
          paddingLeft: 0,
        }}
        title={'Hata / Öneri Bildir'}
      />

      <KeyboardAwareScrollView
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 40,
          width: SIZES.width,
        }}>
        <Text
          style={{
            ...FONTS.H3,
            paddingHorizontal: 20,
            fontSize: 14,
            color: COLORS.black,
            marginBottom: 20,
            textAlign: 'center',
          }}>
          oSınıf hakkında daha detaylı bilgi almak, herhangi bir hatayı bildirmek isterseniz
          aşağıdaki formu kullanarak bizlere ulaşabilirsiniz.
        </Text>

        {profileInput({
          label: 'İsim Soyisim',
          disabled: true,
          value: userInfo.NAME + ' ' + userInfo.LASTNAME,
          placeholder: '',
        })}
        {profileInput({
          label: 'Telefon Numarası',
          disabled: true,
          value: userInfo.PHONE,
          placeholder: '',
        })}
        {profileInput({
          label: 'E-mail',
          disabled: true,
          value: userInfo.EMAIL,
          placeholder: '',
        })}
        <View
          style={{
            width: '100%',
            zIndex: 1,
            alignItems: 'center',
          }}>
          {PickerWithLabel({
            label: 'Konu',
            placeholder: 'Kategori seçiniz...',
            items: [
              { label: 'Hata', value: 'Hata' },
              { label: 'Öneri', value: 'Öneri' },
            ],
            selectedValue: selectedSubject,
            onValueChange: value => {
              setSelectedSubject(value);
            },
            itemKey: 'label',
            type: 'SCROLLVIEW',
            value: 'value',
            setValue: setSelectedSubject,

            open,
            setOpen,

            shadow: true,
          })}
        </View>
        {profileInput({
          label: 'Mesajınız',
          placeholder: 'Mesajınızı giriniz...',
          height: 120,

          value: message,
          onChangeText: text => {
            setMessage(text);
          },
          multiline: true,
        })}
        <View
          style={{
            marginTop: 10,
          }}>
          {mainButton({
            text: 'Gönder',
            onPress: () => {
              defApiFunc('setWebErrors', {
                token: token,
                message: selectedSubject + ' - ' + message,
              })
                .then(res => {
                  Alert.alert('Başarılı', res.data[0].MESSAGE);
                })
                .catch(err => {
                  console.log(err, 'err');
                });
            },
          })}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default ContactUsScreen;
