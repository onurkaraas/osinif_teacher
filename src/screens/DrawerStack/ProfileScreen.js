import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { useContext, useEffect, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { AuthContext } from '../../context/AuthContext';
import ProfileSettings from './profile/ProfileSettings';
import CompanySettings from './profile/CompanySetttings';
import profileInput from '../../components/main/profileInput';
import saveButton from '../../components/buttons/saveButton';
import PickerWithLabel from '../../components/main/pickerWithLabel';
import regions from '../../data/regions';
import Spinner from 'react-native-loading-spinner-overlay';
import updateProfile from '../../api/user/updateProfile';

const ProfileScreen = ({ navigation }) => {
  const { user, userInfo: userInf, setIsProfileUpdated } = useContext(AuthContext);

  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  //pciker
  const [selectedValue, setSelectedValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(regions);
  const onValueChange = value => {
    setSelectedValue(value);
  };

  const handleChanges = (text, type) => {
    setUserInfo({
      ...userInfo,
      [type]: text,
    });
  };
  useEffect(() => {
    setUserInfo(userInf);
    setSelectedValue(userInf?.CITY?.toString());
    setLoading(false);
  }, [userInf]);
  if (!userInfo) {
    return <></>;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          width: '90%',
          height: 50,
        }}>
        <TouchableOpacity
          onPress={() => setSelected(0)}
          style={{
            borderBottomWidth: selected === 0 ? 2 : 0,
            borderBottomColor: COLORS.blue,
          }}>
          <Text style={{ ...FONTS.BODY1, fontSize: 14 }}>Profil Ayarlarım</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelected(1)}
          style={{
            borderBottomWidth: selected === 1 ? 2 : 0,
            borderBottomColor: COLORS.blue,
          }}>
          <Text style={{ ...FONTS.BODY1, fontSize: 14 }}>Kurum Ayarlarım</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 10,
          width: SIZES.width,
          alignItems: 'center',
        }}>
        {selected === 0 && (
          <ProfileSettings
            datePickerVisible={datePickerVisible}
            setDatePickerVisible={setDatePickerVisible}
            handleChanges={handleChanges}
            userInfo={userInfo}
          />
        )}
        {selected === 0 && (
          <View
            style={{
              zIndex: 999,
            }}>
            <PickerWithLabel
              label={'Şehir'}
              dropDownDirection={'TOP'}
              type={'SCROLLVIEW'}
              placeholder={'Şehir Seçiniz'}
              searchPlaceholder={'Şehir Ara'}
              itemKey={'il_adi'}
              value={'plaka_kodu'}
              setValue={setSelectedValue}
              selectedValue={selectedValue}
              items={items}
              setItems={setItems}
              open={open}
              setOpen={setOpen}
              onValueChange={onValueChange}
              shadow={true}
            />
          </View>
        )}

        {selected === 1 && <CompanySettings handleChanges={handleChanges} userInfo={userInfo} />}

        {selected === 2 && (
          <>
            {profileInput({
              label: 'Veli Adı',
              value: userInfo?.FAMILYNAME,
              onChangeText: text => {
                handleChanges(text, 'FAMILYNAME');
              },
              placeholder: 'Veli Adını giriniz',
            })}
            {profileInput({
              label: 'Telefon Numarası',
              value: userInfo?.FAMILYPHONE,
              onChangeText: text => {
                handleChanges(text, 'FAMILYPHONE');
              },
              placeholder: 'Veli Telefon Numarasını giriniz',
            })}
          </>
        )}

        <View
          style={{
            alignItems: 'center',
            marginTop: 20,
          }}>
          {saveButton({
            text: 'Kaydet',
            onPress: () => {
              updateProfile(user.USERID, {
                firstnameInput: userInfo.NAME !== userInf.NAME ? userInfo.NAME : null,
                lastnameInput: userInfo.LASTNAME !== userInf.LASTNAME ? userInfo.LASTNAME : null,
                DateBirth: userInfo.BIRTHDATE !== userInf.BIRTHDATE ? userInfo.BIRTHDATE : null,
                cboCity:
                  userInf?.CITY?.toString() !== selectedValue ? parseInt(selectedValue) : null,
                familyname: userInfo.FAMILYNAME !== userInf.FAMILYNAME ? userInfo.FAMILYNAME : null,
                familyphone:
                  userInfo.FAMILYPHONE !== userInf.FAMILYPHONE ? userInfo.FAMILYPHONE : null,
              }).then(
                res => {
                  if (res) {
                    if (res.data[0].STYLE === 'success') {
                      setIsProfileUpdated(true);
                      Alert.alert(
                        'Başarılı',
                        res.data[0].MESSAGE ?? 'Profiliniz başarıyla güncellendi',
                        [
                          {
                            text: 'Tamam',
                            style: 'cancel',
                          },
                        ],
                      );
                    } else {
                      Alert.alert('Hata', 'Ayarlarınız güncellenirken bir hata oluştu', [
                        {
                          text: 'Tamam',
                          style: 'cancel',
                        },
                      ]);
                    }
                  } else {
                    Alert.alert('Hata', 'Ayarlarınız güncellenirken bir hata oluştu', [
                      {
                        text: 'Tamam',
                        style: 'cancel',
                      },
                    ]);
                  }
                },
                err => {
                  console.log(err);
                },
              );
            },
          })}
        </View>
      </KeyboardAwareScrollView>
      {loading && <Spinner visible={true} />}
    </View>
  );
};
export default ProfileScreen;
