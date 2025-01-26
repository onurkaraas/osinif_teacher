import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  BODY3,
  BODY4,
  COLORS,
  H1,
  SHADOWS,
  SIZES,
} from "../../../../constants/theme";
import { defApiFunc } from "../../../../api";
import moment from "moment/moment";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";

const AllExamsScreen = ({ navigation, route }) => {
  const { testData, textData } = route.params;
  const { token } = useContext(AuthContext);
  const [selected, setSelected] = useState("test");

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
      }}
    >
      <View
        style={{
          width: SIZES.width,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: 8,
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setSelected("test");
            }}
            style={{
              borderBottomColor:
                selected === "test" ? COLORS.red : COLORS.darkGray,
              borderBottomWidth: 2,
              alignItems: "flex-start",
              backfaceVisibility: "hidden",
            }}
          >
            <Text
              style={{
                ...BODY3,
                fontSize: 16,
                paddingHorizontal: 5,
                color: selected === "test" ? COLORS.black : COLORS.darkGray,
              }}
            >
              Testler ({testData.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelected("text");
            }}
            style={{
              borderBottomColor:
                selected !== "test" ? COLORS.red : COLORS.darkGray,
              borderBottomWidth: 2,
              alignItems: "flex-start",
              backfaceVisibility: "hidden",
            }}
          >
            <Text
              style={{
                ...BODY3,
                fontSize: 16,
                paddingHorizontal: 5,
                color: selected !== "test" ? COLORS.black : COLORS.darkGray,
              }}
            >
              Yazılılar ({textData.length})
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.testContainer}>
          <FlatList
            nestedScrollEnabled={true}
            numColumns={2}
            contentContainerStyle={{
              paddingLeft: SIZES.width * 0.0125,
            }}
            style={{
              width: SIZES.width,
            }}
            data={selected === "test" ? testData : textData}
            keyExtractor={(item) => item.CODE}
            renderItem={({ item }) => (
              <View
                style={{
                  ...SHADOWS.shadowOne,
                  paddingVertical: 5,
                  justifyContent: "space-between",
                  marginLeft: SIZES.width * 0.025,
                  width: SIZES.width * 0.45,
                  backgroundColor: "#EFEFEF",
                  marginBottom: 10,
                  borderRadius: 8,
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 7.5,
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      ...H1,
                      fontSize: 16,
                      color: COLORS.primaryDark,
                    }}
                  >
                    {item.NAME}
                  </Text>
                  <Text
                    numberOfLines={3}
                    style={{
                      ...H1,
                      fontSize: 14,
                      color: COLORS.black,
                    }}
                  >
                    {item.DESCRIPTION}
                  </Text>
                  <Text
                    style={{
                      ...H1,
                      fontSize: 14,
                      color: "#C63A0D",
                    }}
                  >
                    Soru Sayısı: {item.C_TOTAL}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Exam", {
                        exam: item,
                      });
                    }}
                    style={{
                      marginTop: 10,
                      backgroundColor: COLORS.primaryDark,
                      borderRadius: 8,
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical: 5,
                    }}
                  >
                    <Text
                      style={{
                        ...BODY4,
                        fontSize: 12,
                        color: COLORS.white,
                      }}
                    >
                      Çözmeye Başla
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    borderTopColor: COLORS.softGray,
                    borderTopWidth: 1,
                    marginTop: 10,
                    paddingTop: 5,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 5,
                  }}
                >
                  <Text
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                    style={{
                      ...BODY4,
                      fontSize: 12,
                      color: COLORS.softGray,
                    }}
                  >
                    {moment(item.RECORDDATE).format("DD MMM YY")}
                    {" - "}
                  </Text>
                  <Text
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                    style={{
                      ...BODY4,
                      fontSize: 12,
                      color: COLORS.softGray,
                    }}
                  >
                    {moment(item.EXPIRE).format("DD MMM YY")}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: SIZES.width * 0.4,
    height: SIZES.width * 0.15,
  },
  testContainer: {
    marginTop: 12,
    alignItems: "center",
    paddingBottom: 80,
  },
  homeworkContainer: {
    width: SIZES.width * 0.435,
    height: SIZES.width * 0.35,
    paddingBottom: 5,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    paddingTop: 10,
    borderWidth: 3,
    borderColor: COLORS.lightBlue,
  },
});
export default AllExamsScreen;
