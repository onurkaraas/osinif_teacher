import profileInput from "../../../components/main/profileInput";
import { View, Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SHADOWS, SIZES } from "../../../constants/theme";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const ProfileSettings = ({
  userInfo,
  handleChanges,
  setDatePickerVisible,
  datePickerVisible,
}) => {
  return (
    <>
      {profileInput({
        label: "Email",
        value: userInfo?.EMAIL,
        disabled: true,
        placeholder: "Adınızı giriniz",
      })}
      {profileInput({
        label: "Telefon",
        value: userInfo?.PHONE,
        disabled: true,
        placeholder: "Adınızı giriniz",
      })}
      {profileInput({
        label: "İsim",
        value: userInfo?.NAME,
        onChangeText: (text) => {
          handleChanges(text, "NAME");
        },
        placeholder: "Adınızı giriniz",
      })}
      {profileInput({
        label: "Soyisim",
        value: userInfo?.LASTNAME,
        onChangeText: (text) => {
          handleChanges(text, "LASTNAME");
        },
        placeholder: "Soyadınızı giriniz",
      })}
      <Text
        style={{
          ...FONTS.BODY3,
          zIndex: 1,
          width: SIZES.width * 0.84,
          marginBottom: 4,
          color: COLORS.darkGray,
          marginLeft: 4,
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
            ...FONTS.BODY2,

            color: COLORS.black,
            marginLeft: 4,
          }}
        >
          {userInfo?.BIRTHDATE ? userInfo?.BIRTHDATE : "Doğum Tarihi"}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        maximumDate={new Date()}
        isVisible={datePickerVisible}
        date={new Date(userInfo?.BIRTHDATE)}
        mode="date"
        accessibilityLanguage={"tr"}
        locale={"tr"}
        onConfirm={(date) => {
          handleChanges(moment(date).format("YYYY-MM-DD"), "BIRTHDATE");
          setDatePickerVisible(false);
        }}
        onCancel={() => setDatePickerVisible(false)}
      />
    </>
  );
};
export default ProfileSettings;
