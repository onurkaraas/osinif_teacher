import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { BODY3, BODY4, COLORS, SHADOWS, SIZES } from "../../../constants/theme";
import { Image } from "expo-image";
import { defApiFunc, FILE_URL, REF_FILE_URL } from "../../../api";
import { ResizeMode, Video } from "expo-av";
import { useIsFocused } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import ImageView from "react-native-image-viewing";

const ExamResultScreen = ({ route }) => {
  const { data, title } = route.params;
  const isFocused = useIsFocused();
  const { token, userInfo } = useContext(AuthContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState(data[1]);
  const questionListRef = useRef(null);
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [vimeoData, setVimeoData] = useState(null);
  const [screenType, setScreenType] = useState("question");
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [images, setImages] = useState([
    {
      uri: questions[currentQuestion].REF_FILENAME
        ? REF_FILE_URL + questions[currentQuestion].REF_FILENAME
        : FILE_URL +
          questions[currentQuestion].LEVELS +
          "/" +
          questions[currentQuestion].LESSON +
          "/" +
          questions[currentQuestion].FILENAME,
    },
  ]);

  useEffect(() => {
    if (isFocused) {
      setCurrentQuestion(0);
      setScreenType("question");
    }
  }, [isFocused]);

  useEffect(() => {
    questionListRef.current.scrollToIndex({ index: currentQuestion });
  }, [currentQuestion]);

  const getVideo = async (code) => {
    fetch(`https://api.vimeo.com/videos/${code}`, {
      method: "GET",
      headers: {
        Authorization: "bearer a46bab98f2588bc7b4a6065569895150",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const videoUrl = data?.files?.find(
          (file) => file?.rendition === userInfo.VIDEOQUALITY?.toString() + "p",
        )?.link;
        setVimeoData(videoUrl);
      })
      .catch((err) => console.log(err));
  };
  const answers = [
    {
      id: 1,
      text: "A",
    },
    {
      id: 2,
      text: "B",
    },
    {
      id: 3,
      text: "C",
    },
    {
      id: 4,
      text: "D",
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
        alignItems: "center",
      }}
    >
      <View
        style={{
          marginTop: 10,
          borderBottomColor: COLORS.blue,
          borderBottomWidth: 2,
          alignItems: "center",
          width: "90%",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            ...BODY3,
            fontSize: 16,
            paddingRight: 5,
            paddingHorizontal: 5,
            color: COLORS.black,
          }}
        >
          {title}
        </Text>
      </View>
      <View
        style={{
          paddingTop: 20,
          width: SIZES.width,
        }}
      >
        <View
          style={{
            ...SHADOWS.shadowTwo,
            alignSelf: "center",
            height: SIZES.height * 0.4,
            backgroundColor: COLORS.white,
            justifyContent: "center",
            alignItems: "center",
            width: SIZES.width * 0.9,
            borderWidth: 3,
            borderRadius: 20,
            borderColor: COLORS.lightBlue,
          }}
        >
          {screenType === "question" ? (
            <View>
              <Image
                style={{
                  width: SIZES.width * 0.875,
                  height: SIZES.height * 0.385,
                  borderRadius: 20,

                  backgroundColor: COLORS.white,
                }}
                contentFit={"contain"}
                source={{
                  uri: questions[currentQuestion].REF_FILENAME
                    ? REF_FILE_URL + questions[currentQuestion].REF_FILENAME
                    : FILE_URL +
                      questions[currentQuestion].LEVELS +
                      "/" +
                      questions[currentQuestion].LESSON +
                      "/" +
                      questions[currentQuestion].FILENAME,
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setImages([
                    {
                      uri: questions[currentQuestion].REF_FILENAME
                        ? REF_FILE_URL + questions[currentQuestion].REF_FILENAME
                        : FILE_URL +
                          questions[currentQuestion].LEVELS +
                          "/" +
                          questions[currentQuestion].LESSON +
                          "/" +
                          questions[currentQuestion].FILENAME,
                    },
                  ]);
                  setIsImageVisible(true);
                }}
                style={{
                  position: "absolute",
                  right: 2.5,
                  top: 0,
                  borderRadius: 800,
                }}
              >
                <Icon
                  color={"rgba(0, 0, 0,.75)"}
                  type={"feather"}
                  name={"zoom-in"}
                />
              </TouchableOpacity>
            </View>
          ) : null}
          {screenType === "video" && (
            <>
              {isVideoLoading && (
                <View
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size="large" color={COLORS.blue} />
                </View>
              )}
              <Video
                onLoadStart={() => {
                  setIsVideoLoading(true);
                  console.log("onLoadStart");
                }}
                onLoad={() => {
                  setIsVideoLoading(false);
                  console.log("onLoad");
                }}
                onError={(error) => console.log("error", error)}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 18,
                }}
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls={true}
                source={{
                  uri: vimeoData,
                }}
              />
            </>
          )}
        </View>
        <View
          style={{
            marginTop: 20,
            width: SIZES.width,
            alignItems: "center",
          }}
        >
          <FlatList
            numColumns={2}
            data={answers}
            renderItem={({ item }) => (
              <View
                style={{
                  width: SIZES.width * 0.4,
                  height: 50,
                  margin: 10,
                  borderRadius: 8,
                  backgroundColor:
                    questions[currentQuestion].CORRECT === item.id
                      ? COLORS.green
                      : questions[currentQuestion].ANSWER === item.id
                        ? COLORS.red
                        : COLORS.gray,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    ...BODY4,
                    fontSize: 16,
                    color: COLORS.white,
                  }}
                >
                  {item.text}
                </Text>
              </View>
            )}
          />
          <TouchableOpacity
            onPress={() => {
              if (screenType === "question") {
                getVideo(questions[currentQuestion].VIMEO_ID).then(() => {
                  setScreenType("video");
                });
              } else {
                setScreenType("question");
              }
            }}
            style={{
              width: SIZES.width * 0.4,
              height: 50,
              margin: 10,
              borderRadius: 8,
              backgroundColor: COLORS.blue,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                ...BODY4,
                fontSize: 16,
                color: COLORS.white,
              }}
            >
              {screenType === "question" ? "Çözüm Videosu" : "Soruya Geri Dön"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        style={{
          flex: 1,
          marginLeft: 12,
        }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: 10,
          paddingRight: 20,
        }}
        ref={questionListRef}
        horizontal={true}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setCurrentQuestion(index);
              setScreenType("question");
            }}
            style={{
              width: 40,
              height: 40,
              marginRight: 10,
              borderColor: COLORS.blue,
              backgroundColor:
                item.CORRECT === item.ANSWER ? COLORS.green : COLORS.red,
              borderRadius: 8,
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                ...BODY4,
                fontSize: 16,
                color: COLORS.black,
              }}
            >
              {index + 1}
            </Text>
          </TouchableOpacity>
        )}
        data={questions}
      />
      {/*<ActivityIndicator></ActivityIndicator>*/}
      <ImageView
        swipeToCloseEnabled={true}
        images={images}
        imageIndex={0}
        visible={isImageVisible}
        onRequestClose={() => setIsImageVisible(false)}
      />
    </View>
  );
};
export default ExamResultScreen;
