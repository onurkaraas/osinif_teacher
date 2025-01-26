import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BODY3, COLORS, FONTS, SHADOWS, SIZES } from "../../../constants/theme";
import { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import profileInput from "../../../components/main/profileInput";
import saveButton from "../../../components/buttons/saveButton";
import { useIsFocused } from "@react-navigation/native";
import { defApiFunc } from "../../../api";
import shuffleArray from "../../../helpers/shuffleArray";

const WordGameScreen = ({ navigation, route }) => {
  const { data, lang } = route.params;
  const isFocused = useIsFocused();
  const [currentWord, setCurrentWord] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [countDown, setCountDown] = useState(3);
  const [userAnswer, setUserAnswer] = useState("");

  const answerQuestion = (id) => {
    defApiFunc("setGameAnswer", {
      user: 150,
      type: 2,
      game_param: lang.toLowerCase(),
      sourceid: data[currentWord].ID,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const [answerIndex, setAnswerIndex] = useState([
    currentWord,
    getRandomNumber(currentWord + 1, data.length - 3),
    getRandomNumber(currentWord + 1, data.length - 3),
    getRandomNumber(currentWord + 1, data.length - 3),
  ]);

  useEffect(() => {
    if (isFocused) {
      setCurrentWord(0);
      setShowAnswer(false);
      setUserAnswer(null);
    }
  }, [isFocused]);
  useEffect(() => {
    let arr = shuffleArray([
      currentWord,
      getRandomNumber(currentWord + 1, data.length - 3),
      getRandomNumber(currentWord + 1, data.length - 3),
      getRandomNumber(currentWord + 1, data.length - 3),
    ]);
    setAnswerIndex(arr);
    setCountDown(3);
  }, [currentWord]);
  useEffect(() => {
    if (showAnswer) {
      setTimeout(() => {
        setCurrentWord((prevWord) => prevWord + 1);
        setShowAnswer(false);
      }, 3000);
    }
  }, [showAnswer]);
  useEffect(() => {
    let timer = null;

    if (showAnswer) {
      // Assuming 'section' changes to 'read' when user starts reading
      timer = setInterval(() => {
        setCountDown((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (timer) {
      clearInterval(timer);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [showAnswer]);
  const isCorrect = (index) => {
    if (index === currentWord) {
      answerQuestion();
      setShowAnswer(true);
      setUserAnswer(index);
      setIsAnswerCorrect(true);
    } else {
      setShowAnswer(true);
      setUserAnswer(index);
      setIsAnswerCorrect(false);
    }
  };
  const bgColor = (index) => {
    if (userAnswer === answerIndex[index]) {
      if (answerIndex[index] === currentWord) {
        return COLORS.green;
      } else {
        return COLORS.red;
      }
    } else if (showAnswer && answerIndex[index] === currentWord) {
      return COLORS.green;
    } else {
      return COLORS.lightGrayOne;
    }
  };
  const textColor = (index) => {
    if (userAnswer === answerIndex[index]) {
      if (answerIndex[index] === currentWord) {
        return COLORS.white;
      } else {
        return COLORS.white;
      }
    } else if (showAnswer && answerIndex[index] === currentWord) {
      return COLORS.white;
    } else {
      return "#474747";
    }
  };

  console.log(data[currentWord]);
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
          flexDirection: "row",
          justifyContent: "space-between",
          width: "90%",
          marginVertical: 10,
        }}
      >
        <View
          style={{
            borderBottomColor: COLORS.blue,
            borderBottomWidth: 2,
            marginBottom: 20,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...BODY3,
              fontSize: 16,
              paddingHorizontal: 5,

              color: COLORS.black,
            }}
          >
            Leblebi
          </Text>
        </View>
        <Text
          style={{
            ...BODY3,
            fontSize: 18,
            paddingHorizontal: 5,

            color: COLORS.black,
          }}
        >
          {currentWord + 1}/{data.length}
        </Text>
      </View>
      <KeyboardAwareScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View
          style={{
            width: SIZES.width * 0.9,
            borderRadius: 10,
            ...SHADOWS.shadowOne,
            height: SIZES.height * 0.075,
            backgroundColor: COLORS.green,
            justifyContent: "center",
            marginVertical: 20,
            marginBottom: SIZES.height * 0.035,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...FONTS.H3,
              fontSize: 22,
              color: COLORS.white,
            }}
          >
            {/*{JSON.stringify(data[currentWord])}*/}
            {data[currentWord]["TR"]}
          </Text>
        </View>

        <View
          style={{
            height: SIZES.height * 0.6,
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              isCorrect(answerIndex[0]);
            }}
            style={{
              ...styles.answerContainer,
              backgroundColor: bgColor(0),
            }}
          >
            <Text
              style={{
                ...FONTS.H3,
                color: textColor(0),
              }}
            >
              {data[answerIndex[0]][lang]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              isCorrect(answerIndex[1]);
            }}
            style={{
              ...styles.answerContainer,
              backgroundColor: bgColor(1),
            }}
          >
            <Text
              style={{
                ...FONTS.H3,
                color: textColor(1),
              }}
            >
              {data[answerIndex[1]][lang]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              isCorrect(answerIndex[2]);
            }}
            style={{
              ...styles.answerContainer,
              backgroundColor: bgColor(2),
            }}
          >
            <Text
              style={{
                ...FONTS.H3,
                color: textColor(2),
              }}
            >
              {data[answerIndex[2]][lang]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              isCorrect(answerIndex[3]);
            }}
            style={{
              ...styles.answerContainer,
              backgroundColor: bgColor(3),
            }}
          >
            <Text
              style={{
                ...FONTS.H3,
                color: textColor(3),
              }}
            >
              {data[answerIndex[3]][lang]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCurrentWord((prevWord) => prevWord + 1);
            }}
            style={{
              alignSelf: "center",
              width: SIZES.width * 0.7,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
              backgroundColor: "#F3AC23FF",
              height: SIZES.height * 0.05,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                ...FONTS.H3,
                color: COLORS.white,
              }}
            >
              Pas Geç
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      {showAnswer && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: SIZES.width,
            height: SIZES.height * 0.1,
            backgroundColor: isAnswerCorrect ? COLORS.green : COLORS.red,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...FONTS.H3,
              color: COLORS.white,
            }}
          >
            {isAnswerCorrect ? "Doğru" : "Yanlış"}
          </Text>
          <View
            style={{
              position: "absolute",
              right: 40,
              ...FONTS.H3,
              color: COLORS.white,
              borderWidth: 1,
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              borderColor: COLORS.white,
            }}
          >
            <Text
              style={{
                ...FONTS.H1,

                color: COLORS.white,
              }}
            >
              {countDown}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  answerContainer: {
    width: SIZES.width * 0.9,
    borderRadius: 10,
    height: SIZES.height * 0.075,
    ...SHADOWS.shadowOne,

    backgroundColor: "#CCCCCC",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default WordGameScreen;
