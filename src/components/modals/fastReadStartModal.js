import { Text, TouchableOpacity, View } from "react-native";
import { BODY3, BODY4, COLORS, SHADOWS, SIZES } from "../../constants/theme";
import { Icon } from "@rneui/base";
import Modal from "react-native-modal";
import { mainButton } from "../buttons";
import PickerWithLabel from "../main/pickerWithLabel";
import { useState } from "react";
const TimePicker = (props) => {
  const { value, setValue, selectedTime, setSelectedTime } = props;
  const isSelected = value === selectedTime;
  return (
    <TouchableOpacity
      onPress={() => {
        setValue(value);
      }}
      style={{
        marginVertical: 2.5,
        marginHorizontal: 5,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: isSelected ? COLORS.success : COLORS.lightGrayFour,
        borderRadius: 8,
        paddingVertical: 7.5,
        paddingHorizontal: 10,
      }}
    >
      <Text
        style={{
          ...BODY3,
          fontSize: 16,
          color: isSelected ? COLORS.success : COLORS.darkGray,
        }}
      >
        {value}
      </Text>
    </TouchableOpacity>
  );
};
const FastReadStartModal = ({
  isVisible,
  setIsVisible,
  setIsTimerRunning,
  selectedTime,
  setSelectedTime,
  setUpdate,
  timeList,
  random,
  setRandom,
}) => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  return (
    <View>
      <Modal
        backdropColor={"#000"}
        backdropOpacity={0}
        visible={isVisible}
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
            paddingBottom: 24,
            paddingVertical: 12,
            width: "50%",
            borderRadius: 20,
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
          <Text
            style={{
              ...BODY4,
              fontSize: 22,
              paddingTop: 10,
              color: COLORS.black,
              marginBottom: 6,
            }}
          >
            Hızlı Okuma Alıştırmaları
          </Text>
          <Text
            style={{
              ...BODY3,
              fontSize: 16,
              color: COLORS.darkGray,
              marginBottom: 8,
              paddingHorizontal: 10,
              textAlign: "center",
            }}
          >
            Kelimelerin gösterilme süresini seçiniz {"\n"}(1.2-3 saniye arası)
          </Text>
          <Text
            style={{
              ...BODY3,
              fontSize: 16,
              color: COLORS.darkGray,
              marginBottom: 4,
              paddingHorizontal: 10,
              textAlign: "left",
              width: "80%",
            }}
          >
            Süre
          </Text>
          <View
            style={{
              zIndex: 9999,
              flexDirection: "row",
              flexWrap: "wrap",
              marginBottom: 12,
            }}
          >
            {timeList.map((item, index) => (
              <TimePicker
                key={index}
                value={item.value}
                setValue={setSelectedTime}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
              />
            ))}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "80%",
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setRandom(false);
              }}
              style={{
                width: "45%",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: !random ? COLORS.success : COLORS.darkGray,
                borderRadius: 8,
                paddingVertical: 7.5,
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{
                  ...BODY3,
                  fontSize: 16,
                  color: !random ? COLORS.success : COLORS.darkGray,
                }}
              >
                Sıralı
              </Text>
              {!random && (
                <View
                  style={{
                    position: "absolute",
                    right: 10,
                  }}
                >
                  <Icon
                    size={20}
                    color={COLORS.success}
                    name={"check"}
                    type={"feather"}
                  />
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setRandom(true);
              }}
              style={{
                width: "45%",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: random ? COLORS.success : COLORS.lightGrayFour,
                borderRadius: 8,
                paddingVertical: 7.5,
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{
                  ...BODY3,
                  fontSize: 16,
                  color: random ? COLORS.success : COLORS.darkGray,
                }}
              >
                Rastgele
              </Text>
              {random && (
                <View
                  style={{
                    position: "absolute",
                    right: 10,
                  }}
                >
                  <Icon
                    size={20}
                    color={COLORS.success}
                    name={"check"}
                    type={"feather"}
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>
          {mainButton({
            text: "Oyunu Başlat",
            width: SIZES.width * 0.7,
            onPress: async () => {
              setIsVisible(false);
              setIsTimerRunning(true);
            },
          })}
          <TouchableOpacity
            onPress={() => {
              setUpdate(true);
            }}
          >
            <Text
              style={{
                ...BODY3,
                fontSize: 16,
                color: COLORS.darkGray,
                marginTop: 10,
                textAlign: "center",
              }}
            >
              Kelimeleri Yenile
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
export default FastReadStartModal;
