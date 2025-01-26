import { View, Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SHADOWS, SIZES } from "../../constants/theme";
import { useContext, useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import saveButton from "../../components/buttons/saveButton";
import notificationSwitch from "../../components/settings/notificationSwitch";
import DropDownPicker from "react-native-dropdown-picker";
import { AuthContext } from "../../context/AuthContext";
import { defApiFunc } from "../../api";
import updateProfile from "../../api/user/updateProfile";
import DrawerScreensTitle from "../../components/drawer/drawerScreensTitle";

const SettingsScreen = ({ navigation }) => {
  const { userInfo, user, setIsProfileUpdated } = useContext(AuthContext);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [mailNotifications, setMailNotifications] = useState(false);
  // const [appNotifications, setAppNotifications] = useState(false);
  //resolution
  const [resolutionOpen, setResolutionOpen] = useState(false);
  const [selectedResolution, setSelectedResolution] = useState(1);

  useEffect(() => {
    setSmsNotifications(userInfo.SMSNOTIFICATION);
    setMailNotifications(userInfo.EMAILNOTIFICATION);
    setSelectedResolution(userInfo.VIDEOQUALITY);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
        alignItems: "flex-start",
        paddingHorizontal: 20,
        paddingTop: 10,
      }}
    >
      <DrawerScreensTitle
        style={{
          paddingLeft: 0,
        }}
        title={"Ayarlarım"}
      />

      <View
        style={{
          flex: 1,
        }}
      >
        {notificationSwitch({
          title: "SMS Bildirimleri",
          value: smsNotifications,
          setValue: setSmsNotifications,
        })}
        {notificationSwitch({
          title: "Mail  Bildirimleri",
          value: mailNotifications,
          setValue: setMailNotifications,
        })}
        {/*{notificationSwitch({*/}
        {/*  title: "Uygulama  Bildirimleri",*/}
        {/*  value: appNotifications,*/}
        {/*  setValue: setAppNotifications,*/}
        {/*})}*/}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 24,
            width: SIZES.width * 0.65,
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 2,
          }}
        >
          <Text
            style={{
              ...FONTS.BODY2,
              fontSize: 16,
              color: COLORS.black,
            }}
          >
            Video Çözünürlüğü
          </Text>
          <DropDownPicker
            textStyle={{
              ...FONTS.BODY3,
              fontSize: SIZES.body1,

              marginLeft: 6,
            }}
            items={[
              { id: 1, name: 1080 },
              {
                id: 2,
                name: 720,
              },
              { id: 3, name: 540 },
              { id: 5, name: 360 },
              { id: 6, name: 240 },
            ]}
            containerStyle={{
              alignItems: "center",
              height: 36,
              justifyContent: "center",
              ...SHADOWS.shadowOne,
            }}
            style={{
              borderWidth: 0,
              height: 36,
              borderBottomWidth: 0,
              width: SIZES.width * 0.25,
              borderRadius: 8,
            }}
            itemStyle={{
              justifyContent: "flex-start",
              ...FONTS.BODY2,
            }}
            dropDownContainerStyle={{
              width: SIZES.width * 0.25,
              borderWidth: 0,
              borderRadius: 8,
            }}
            onChangeItem={(item) => setSelectedResolution(item)}
            open={resolutionOpen}
            setOpen={setResolutionOpen}
            setValue={setSelectedResolution}
            value={selectedResolution}
            schema={{
              label: "name",
              value: "name",
            }}
          />
        </View>
        <View
          style={{
            width: SIZES.width - 40,
            marginTop: 8,
            alignItems: "center",
          }}
        >
          {saveButton({
            text: "Kaydet",
            onPress: () => {
              updateProfile(user.USERID, {
                smsNotification: smsNotifications ? 1 : 0,
                emailNotification: mailNotifications ? 1 : 0,
                cboQuality: selectedResolution,
              }).then(
                (res) => {
                  if (res) {
                    if (res.data[0].STYLE === "success") {
                      setIsProfileUpdated(true);
                      alert("Ayarlarınız başarıyla güncellendi");
                    } else {
                      alert("Ayarlarınız güncellenirken bir hata oluştu");
                    }
                  } else {
                    alert("Ayarlarınız güncellenirken bir hata oluştu");
                  }
                },
                (err) => {
                  console.log(err);
                },
              );
            },
          })}
        </View>
      </View>
    </View>
  );
};
export default SettingsScreen;
