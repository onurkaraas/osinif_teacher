import { BODY3, BODY4, COLORS, SHADOWS, SIZES } from "../../../constants/theme";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "@rneui/base";
import { Image } from "expo-image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { defApiFunc, FILE_URL, REF_FILE_URL } from "../../../api";
import { AuthContext } from "../../../context/AuthContext";
import ImageView from "react-native-image-viewing";
import TextInput from "../../../components/main/textInput";
import { mainButton } from "../../../components/buttons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const ExamScreen = ({ navigation, route }) => {
  const { exam, title } = route.params;
  const { token, user, userInfo } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const questionListRef = useRef(null);
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [textAnswer, setTextAnswer] = useState("");
  useEffect(() => {
    questionListRef?.current?.scrollToIndex({ index: currentQuestion });
  }, [currentQuestion]);
  const [dataTitle, setDataTitle] = useState("");
  const [images, setImages] = useState([]);
  const [imageVisible, setImageVisible] = useState(false);
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
  useEffect(() => {
    defApiFunc("getExamWork", {
      token,
      code: exam.CODE,
    })
      .then((res) => {
        setData(res.data);
        setDataTitle(res.data[0][0].NAME + " " + res.data[0][0].DESCRIPTION);
        setQuestions(res.data[1]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [exam]);
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.primary,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} color={COLORS.blue} />
      </View>
    );
  }
  console.log(data[0][0].CODE, "data");

  if (exam?.EXAMTYPE === 3) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.primary,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <KeyboardAwareScrollView
          extraScrollHeight={0}
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            flexGrow: 1,
            width: SIZES.width,
            paddingVertical: 10,
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Text
            style={{
              ...BODY4,
              marginBottom: 10,
              fontSize: 16,
            }}
          >
            {data[0][0].NAME}
          </Text>
          <Text
            style={{
              ...BODY3,
              fontSize: 16,
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            {data[0][0].DESCRIPTION.replace(/<[^>]*>/g, "")}
          </Text>
          <TextInput
            value={textAnswer}
            onChangeText={(text) => setTextAnswer(text)}
            label={"Cevap"}
            placeholder={"Cevabınızı buraya yazınız"}
            multiline={true}
            height={SIZES.height * 0.5}
          />
          {mainButton({
            text: "Gönder",
            onPress: () => {
              defApiFunc("setUserExamHomeworkResult", {
                token,
                examcode: data[0][0]?.EXAMCODE,
                description: "<p>" + textAnswer + "</p>",
              })
                .then((res) => {
                  console.log(res.data, "res.data");
                  navigation.goBack();
                  // navigation.navigate("Result", {
                  //   data: res.data,
                  //   title: title,
                  // });
                })
                .catch((err) => {
                  console.log(err);
                });
            },
          })}
        </KeyboardAwareScrollView>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        paddingBottom: 20,
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
          numberOfLines={2}
          style={{
            ...BODY3,
            fontSize: 16,
            paddingRight: 5,
            paddingHorizontal: 5,
            color: COLORS.black,
          }}
        >
          {dataTitle ?? exam.NAME + " " + exam.DESCRIPTION}
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
            height: SIZES.height * 0.375,
            backgroundColor: COLORS.white,
            justifyContent: "center",
            alignItems: "center",
            width: SIZES.width * 0.9,
            borderWidth: 3,
            borderRadius: 20,
            borderColor: COLORS.lightBlue,
          }}
        >
          <Image
            style={{
              width: SIZES.width * 0.875,
              height: SIZES.height * 0.35,
              borderRadius: 20,
              backgroundColor: COLORS.white,
            }}
            contentFit={"contain"}
            source={{
              uri: questions[currentQuestion]?.REF_FILENAME
                ? REF_FILE_URL + questions[currentQuestion]?.REF_FILENAME
                : FILE_URL +
                  questions[currentQuestion]?.LEVELS +
                  "/" +
                  questions[currentQuestion]?.LESSON +
                  "/" +
                  questions[currentQuestion]?.FILENAME,
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
              setImageVisible(true);
            }}
            style={{
              position: "absolute",
              right: 5,
              top: 5,
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
              <TouchableOpacity
                onPress={() => {
                  if (questions.length - 1 !== currentQuestion) {
                    setStudentAnswers((prev) => [
                      ...prev,
                      {
                        code: questions[currentQuestion].CODE,
                        value: item.id,
                      },
                    ]);
                    setCurrentQuestion((prev) => prev + 1);
                  } else {
                    setStudentAnswers((prev) => [
                      ...prev,
                      {
                        code: questions[currentQuestion].CODE,
                        value: item.id,
                      },
                    ]);
                    defApiFunc("setUserExamPost", {
                      token,
                      code: data[0][0].CODE,
                      values: studentAnswers,
                    })
                      .then((res) => {
                        console.log(res.data, "res.data");
                        navigation.goBack();
                        // navigation.navigate("Result", {
                        //   data: res.data,
                        //   title: title,
                        // });
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                }}
                style={{
                  width: SIZES.width * 0.4,
                  height: 45,
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
                  {item.text}
                </Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            onPress={() => {
              setStudentAnswers((prev) => [
                ...prev,
                {
                  code: questions[currentQuestion].CODE,
                  value: 0,
                },
              ]);
              setCurrentQuestion((prev) => prev + 1);
            }}
            style={{
              width: SIZES.width * 0.8 + 20,
              height: 45,
              margin: 10,
              borderRadius: 8,
              backgroundColor: "#D9A009",
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
              BOŞ BIRAK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        style={{
          height: 60,
          width: SIZES.width,
        }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 20,
          paddingLeft: 12,
          alignSelf: "flex-end",
          paddingRight: 20,
        }}
        ref={questionListRef}
        horizontal={true}
        renderItem={({ item, index }) => (
          <View
            onPress={() => setCurrentQuestion(index)}
            style={{
              width: 40,
              height: 40,
              marginRight: 10,
              borderColor: COLORS.blue,
              backgroundColor:
                currentQuestion >= index ? COLORS.blue : "transparent",
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
          </View>
        )}
        data={questions}
      />
      {/*<ActivityIndicator></ActivityIndicator>*/}
      <ImageView
        swipeToCloseEnabled={true}
        images={images}
        imageIndex={0}
        visible={imageVisible}
        onRequestClose={() => setImageVisible(false)}
      />
    </View>
  );
};
export default ExamScreen;
