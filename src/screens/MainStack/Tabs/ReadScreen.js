import { BODY2, BODY3, BODY4, H1 } from "../../../constants";
import { COLORS, SHADOWS, SIZES } from "../../../constants/theme";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Icon } from "@rneui/base";
import React, { useContext, useEffect, useState } from "react";
import { defApiFunc } from "../../../api";
import { AuthContext } from "../../../context/AuthContext";
import WebView from "react-native-webview";
import intToMinutes from "../../../helpers/intToMinutes";
import { useIsFocused } from "@react-navigation/native";

const ReadScreen = ({ navigation }) => {
  const { token, userInfo } = useContext(AuthContext);
  const [fontScale, setFontScale] = useState(100);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [paragraphs, setParagraphs] = useState([]);
  const [section, setSection] = useState("category");
  const [selectedParagraph, setSelectedParagraph] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    setLoading(true);
    defApiFunc("getGroups", {
      uplevel: 15832,
      token: token,
    })
      .then(
        (res) => {
          console.log("res", res.data);
          setData(res.data);
        },
        (err) => {
          console.log("err", err);
        },
      )
      .finally(() => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    let timer = null;

    if (isTimerRunning && isFocused) {
      // Assuming 'section' changes to 'read' when user starts reading
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (timer) {
      clearInterval(timer);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isTimerRunning, isFocused]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
        alignItems: "flex-start",
      }}
    >
      <View
        style={{
          width: SIZES.width * 0.95,
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "center",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            marginTop: 10,
            marginBottom: 10,
            borderBottomColor: COLORS.blue,
            borderBottomWidth: 2,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {section !== "category" && (
            <TouchableOpacity
              onPress={() => {
                setSection(
                  section === "paragraphList" ? "category" : "paragraphList",
                );
                setSeconds(0);
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 2.5,
              }}
            >
              <Icon type={"entypo"} name={"chevron-left"} />
            </TouchableOpacity>
          )}
          <Text
            style={{
              maxWidth: SIZES.width * 0.675,
              ...BODY3,
              fontSize: 16,
              paddingHorizontal: 2.5,
              paddingBottom: 2.5,
              paddingRight: section !== "category" ? 5 : 2.5,
              color: COLORS.black,
              lineHeight: 20,
            }}
          >
            {section === "category" || section === "paragraphList"
              ? "Paragraf Oku"
              : selectedParagraph
                ? selectedParagraph[0]?.NAME
                : "Okuma Parçası"}
          </Text>
        </View>
        {section === "read" && (
          <View
            style={{
              backgroundColor: COLORS.blue,
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                ...BODY3,
                fontSize: 16,
                color: COLORS.white,
                paddingVertical: 5,
                paddingHorizontal: 10,
                lineHeight: 20,
              }}
            >
              {intToMinutes(seconds)}
            </Text>
          </View>
        )}
      </View>

      {loading ? (
        <View
          style={{
            flex: 1,
            width: SIZES.width,

            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator color={COLORS.blue} size={"large"} />
        </View>
      ) : section === "category" || section === "paragraphList" ? (
        <FlatList
          ListHeaderComponent={
            <View
              style={{
                alignItems: "center",
                marginBottom: 5,
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={{
                  ...BODY4,
                  fontSize: 16,
                  color: COLORS.black,
                  textAlign: "center",
                }}
              >
                Okuma Parçaları ile hem genel kültürünüzü geliştirin, hem de
                okuma hızınızı arttırın.
              </Text>
              {section === "category" && (
                <Text
                  style={{
                    ...BODY2,
                    fontSize: 14,
                    color: COLORS.black,
                    marginVertical: 10,
                    textAlign: "center",
                  }}
                >
                  <Text
                    style={{
                      ...BODY4,
                      fontSize: 14,
                    }}
                  >
                    Unutmayın ki
                  </Text>
                  ; hızlı ve anlayarak okuma, sizi rakiplerinizin bir adım önüne
                  geçirir.
                </Text>
              )}
              <Text
                style={{
                  ...BODY2,
                  fontSize: 14,
                  textAlign: "center",
                  marginTop: section === "category" ? 0 : 5,
                }}
              >
                {section === "category"
                  ? "Alt tarafta yer alan okuma listesinden konuyu seçerek " +
                    "başlayabilirsiniz."
                  : "Alt tarafta yer alan okuma parçasını seçerek okuyabilirsiniz."}
              </Text>
            </View>
          }
          style={{
            width: SIZES.width,
            paddingHorizontal: SIZES.width * 0.05,
            paddingVertical: 5,
          }}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          data={section === "category" ? data : paragraphs}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                defApiFunc("getParagraph", {
                  token: token,
                  pagecode: section === "category" ? "" : item.CODE,
                  group: section === "category" ? item.ID : 0,
                }).then(
                  (res) => {
                    console.log("res", res.data);
                    if (section === "category") {
                      setParagraphs(res.data[0]);
                      setSection("paragraphList");
                    } else {
                      setSection("read");
                      setSelectedParagraph(res.data[0]);
                    }
                    // navigation.navigate("ReadDetail", { data: res.data });
                  },
                  (err) => {
                    console.log("err", err);
                  },
                );
              }}
              style={{
                backfaceVisibility: "hidden",
                alignSelf: "center",
                flexDirection: "row",
                width: SIZES.width * 0.9,
                justifyContent: "space-between",
                marginTop: 10,
                backgroundColor: "rgb(209, 216, 232)",
                height: 70,
                alignItems: "center",
                paddingHorizontal: 14,
                paddingRight: 7,
                borderRadius: 8,
                ...SHADOWS.shadowOne,
              }}
            >
              <View>
                <Icon
                  type={"font-awesome"}
                  name="quote-left"
                  size={28}
                  color="black"
                />
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  width: "80%",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    ...H1,
                    fontSize: 16,
                    color: COLORS.black,
                    textAlign: "center",
                  }}
                >
                  {item.NAME}
                </Text>
                <Text
                  style={{
                    ...BODY3,
                    fontSize: 14,
                    color: COLORS.darkGray,
                  }}
                >
                  {/*14 Okuma Parçası*/}
                </Text>
              </View>
              <View>
                <Icon
                  size={28}
                  color={"black"}
                  type={"entypo"}
                  name={"chevron-thin-right"}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      ) : null}
      {section === "read" && selectedParagraph && (
        <View
          style={{
            width: SIZES.width,
            justifyContent: "space-between",
            paddingBottom: 90,
            alignItems: "center",
            flex: 1,
            paddingHorizontal: SIZES.width * 0.05,
          }}
        >
          <View
            style={{
              maxHeight: SIZES.height * 0.58,
            }}
          >
            <WebView
              originWhitelist={["*"]}
              source={{
                //<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>${yourHtml}</body></html>
                html:
                  `<!DOCTYPE html><html><head> <meta name="viewport" content="width=device-width" initial-scale="1.00" maximum-scale="1.0"></head>
                    <style>body { font-size: ${fontScale}%; word-wrap: break-word; overflow-wrap: break-word; }</style>` +
                  `<body style="font-family: Verdana" > 
                    ${selectedParagraph[0]?.CONTENTTEXT}
                    </body></html>`,
              }}
              style={{
                backgroundColor: "transparent",
                width: SIZES.width * 0.95,
              }}
            />
            <View
              style={{
                position: "absolute",
                top: 0,
                right: 5,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {fontScale !== 100 && (
                <TouchableOpacity
                  onPress={() => {
                    setFontScale(fontScale - 10);
                  }}
                >
                  <Icon color={"rgba(0, 0, 0, 0.5)"} name={"text-decrease"} />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={{
                  marginLeft: 5,
                }}
                onPress={() => {
                  setFontScale(fontScale + 10);
                }}
              >
                <Icon color={"rgba(0, 0, 0, 0.5)"} name={"text-increase"} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setIsTimerRunning(true);
              }}
              style={{
                backgroundColor: COLORS.green,
                borderRadius: 10,
                marginHorizontal: 10,
                backfaceVisibility: "hidden",
              }}
            >
              <Text
                style={{
                  ...BODY4,
                  fontSize: 14,
                  color: COLORS.white,
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  lineHeight: 20,
                }}
              >
                Okumaya Başla
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (isTimerRunning) {
                  setIsTimerRunning(false);
                  defApiFunc("setParagraphReading", {
                    token: token,
                    doc_id: selectedParagraph[0].CODE,
                    readingtime: seconds,
                    wordcount:
                      selectedParagraph[0].CONTENTTEXT.split(" ").length,
                  }).then(
                    (res) => {
                      console.log("res", res.data);
                      setSection("category");
                    },
                    (err) => {
                      console.log("err", err);
                    },
                  );
                }
              }}
              style={{
                backgroundColor: COLORS.orange,
                borderRadius: 10,
                marginHorizontal: 10,

                backfaceVisibility: "hidden",
              }}
            >
              <Text
                style={{
                  ...BODY4,
                  fontSize: 14,
                  color: COLORS.white,
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  lineHeight: 20,
                }}
              >
                Okumayı Bitir
              </Text>
            </TouchableOpacity>
          </View>
          {/*<Text>{JSON.stringify(selectedParagraph[0])}</Text>*/}
        </View>
      )}
    </View>
  );
};
export default ReadScreen;
