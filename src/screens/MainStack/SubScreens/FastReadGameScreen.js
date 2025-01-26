import { View, Text, TouchableOpacity, Alert } from "react-native";
import { BODY3, COLORS, FONTS, SHADOWS, SIZES } from "../../../constants/theme";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import FastReadAnswer from "../../../components/games/FastReadAnswer";
import shuffleArray from "../../../helpers/shuffleArray";
import { getRandomNumber } from "../../../helpers/check";
import FastReadStartModal from "../../../components/modals/fastReadStartModal";
import { Icon } from "@rneui/base";
import getWords from "../../../api/game/getWords";

const FastReadGameScreen = ({ navigation, route }) => {
  const { data, lang } = route.params;
  const isFocused = useIsFocused();
  const [wordList, setWordList] = useState(data);
  const [update, setUpdate] = useState(false);
  const [timeList, setTimeList] = useState([
    {
      value: 1.5,
      label: "1.5",
    },
    {
      value: 1.2,
      label: "1.2",
    },

    {
      value: 0.9,
      label: "0.9",
    },
    {
      value: 0.6,
      label: "0.6",
    },
    {
      value: 0.4,
      label: "0.4",
    },
  ]);
  const [selectedTime, setSelectedTime] = useState(1.2);
  const [seconds, setSeconds] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [answerArray, setAnswerArray] = useState([
    { word: wordList[currentWord].DE, pr: wordList[currentWord].DE_PR },
    { word: wordList[currentWord].EN, pr: wordList[currentWord].EN_PR },
    { word: wordList[currentWord].GR, pr: wordList[currentWord].GR_PR },
    { word: wordList[currentWord].TR, pr: "" },
  ]);
  const [showedAnswer, setShowedAnswer] = useState(1);
  const [random, setRandom] = useState(false);
  useEffect(() => {
    if (update) {
      getWords({
        lang: lang.toLowerCase(),
      })
        .then((response) => {
          if (response.data) {
            setWordList(response.data);
            setCurrentWord(0);
          }
        })
        .catch((err) => {
          Alert.alert("Bir hata oluştu", "Lütfen tekrar deneyin", [
            {
              text: "Tamam",
              style: "cancel",
            },
          ]);
        })
        .finally(() => {
          setUpdate(false);
          setSeconds(0);
          Alert.alert(
            "Kelime listesi güncellendi",
            "Yeni kelime listesi yüklendi",
            [
              {
                text: "Tamam",
                style: "cancel",
              },
            ],
          );
        });
    }
  }, [update]);
  useEffect(() => {
    if (isFocused) {
      setIsVisible(true);
      setCurrentWord(0);
      setSeconds(0);
      let arr = shuffleArray([
        { word: wordList[currentWord].DE, pr: wordList[currentWord].DE_PR },
        { word: wordList[currentWord].EN, pr: wordList[currentWord].EN_PR },
        { word: wordList[currentWord].GR, pr: wordList[currentWord].GR_PR },
        { word: wordList[currentWord].TR, pr: "" },
      ]);
      setAnswerArray(arr);
      setIsTimerRunning(false);
    }
  }, [isFocused, wordList]);

  useEffect(() => {
    let timer = null;

    if (isTimerRunning && isFocused) {
      // Assuming 'section' changes to 'read' when user starts reading
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 0.1);
      }, 100);
    } else if (timer) {
      clearInterval(timer);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isTimerRunning, isFocused]);
  const generateUniqueRandomNumber = (prevNumber) => {
    const randomNumber = Math.floor(Math.random() * 4) + 1;
    return randomNumber === prevNumber
      ? generateUniqueRandomNumber(prevNumber)
      : randomNumber;
  };

  useEffect(() => {
    if (seconds >= selectedTime) {
      if (!random) {
        setShowedAnswer(showedAnswer !== 4 ? showedAnswer + 1 : 1);
      } else {
        setShowedAnswer(generateUniqueRandomNumber(showedAnswer));
      }
      // setCurrentWord((prevWord) => prevWord + 1);
      setSeconds(0);
      console.log("showedAnswer", showedAnswer);
    }
  }, [seconds]);

  useEffect(() => {
    setSeconds(0);
    if (currentWord > 0) {
      setIsTimerRunning(true);
    }
  }, [currentWord]);

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
            Hızlı Okuma Alıştırmaları
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
          {currentWord}/{wordList.length}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          width: "90%",
          pb: 10,
        }}
      >
        <FastReadAnswer
          showedAnswer={showedAnswer}
          index={1}
          style={{
            position: "absolute",
            left: 10,
            top: 20,
          }}
          text={answerArray[0].word}
          prText={answerArray[0].pr}
        />

        <FastReadAnswer
          index={2}
          showedAnswer={showedAnswer}
          style={{
            right: 10,

            position: "absolute",
            top: 20,
          }}
          text={answerArray[1].word}
          prText={answerArray[1].pr}
        />
        <View
          style={{
            borderRadius: 10,
            ...SHADOWS.shadowOne,
            position: "absolute",
            alignSelf: "center",
            top: "35%",
            backgroundColor: COLORS.green,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/*<Text*/}
          {/*  style={{*/}
          {/*    ...FONTS.H3,*/}
          {/*    fontSize: 22,*/}
          {/*    paddingVertical: 20,*/}
          {/*    paddingHorizontal: 40,*/}
          {/*    color: COLORS.white,*/}
          {/*  }}*/}
          {/*>*/}
          {/*  {wordList[currentWord][lang]}*/}
          {/*</Text>*/}
        </View>
        <FastReadAnswer
          index={3}
          showedAnswer={showedAnswer}
          style={{
            position: "absolute",
            left: 10,
            bottom: 60,
          }}
          text={answerArray[2].word}
          prText={answerArray[2].pr}
        />
        <FastReadAnswer
          index={4}
          showedAnswer={showedAnswer}
          style={{
            position: "absolute",
            right: 10,
            bottom: 60,
          }}
          text={answerArray[3].word}
          prText={answerArray[3].pr}
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 7.5,
          right: 10,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            zIndex: 999,
            width: 45,
            marginHorizontal: 5,
            height: 45,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            backgroundColor: COLORS.primaryDark,
          }}
        >
          <Text
            style={{
              ...BODY3,
              fontSize: 16,
              color: COLORS.white,
            }}
          >
            {(selectedTime - seconds).toFixed(1).replace(".", ",")}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setIsVisible(isTimerRunning);
            setIsTimerRunning(!isTimerRunning);
          }}
          style={{
            zIndex: 99,
            width: 45,
            marginHorizontal: 5,
            height: 45,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            backgroundColor: COLORS.error,
          }}
        >
          <Icon
            size={30}
            color={COLORS.white}
            name={isTimerRunning ? "pause" : "play-circle"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setRandom(!random);
          }}
          style={{
            zIndex: 99,
            paddingHorizontal: 5,
            marginHorizontal: 5,
            height: 45,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            backgroundColor: COLORS.yellow,
          }}
        >
          <Text
            style={{
              ...FONTS.H3,
              fontSize: 12,
              color: COLORS.white,
            }}
          >
            {random ? "Rastgele" : "Sıralı"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCurrentWord(currentWord + 1);
            setAnswerArray([
              {
                word: wordList[currentWord].DE,
                pr: wordList[currentWord].DE_PR,
              },
              {
                word: wordList[currentWord].EN,
                pr: wordList[currentWord].EN_PR,
              },
              {
                word: wordList[currentWord].GR,
                pr: wordList[currentWord].GR_PR,
              },
              { word: wordList[currentWord].TR, pr: "" },
            ]);
          }}
          style={{
            zIndex: 99,
            paddingHorizontal: 5,
            height: 45,
            marginHorizontal: 5,

            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            backgroundColor: COLORS.success,
          }}
        >
          <Text
            style={{
              ...FONTS.H3,
              fontSize: 12,
              color: COLORS.white,
            }}
          >
            Yenile
          </Text>
        </TouchableOpacity>
      </View>
      <FastReadStartModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        setUpdate={setUpdate}
        setIsTimerRunning={setIsTimerRunning}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        timeList={timeList}
        random={random}
        setRandom={setRandom}
      />
    </View>
  );
};
export default FastReadGameScreen;
