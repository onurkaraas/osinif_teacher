import { BODY2, BODY3, BODY4, H1 } from '../../constants';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';
import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { AirbnbRating, Icon } from '@rneui/base';
import React, { useContext, useEffect, useRef, useState } from 'react';
import lessonListComp from '../../components/education/lessonListComp';
import unitListComp from '../../components/education/unitListComp';
import chapterListComp from '../../components/education/chapterListComp';
import reviewTeacherModal from '../../components/modals/reviewTeacherModal';
import { API_URL, defApiFunc } from '../../api';
import { AuthContext } from '../../context/AuthContext';
import { ResizeMode, Video } from 'expo-av';
import questionListComp from '../../components/education/questionListComp';
import mainButton from '../../components/buttons/mainButton';

const EducationScreen = ({ navigation }) => {
  const { token, userInfo } = useContext(AuthContext);
  const [lessons, setLessons] = useState([]);
  const [purchasedLessons, setPurchasedLessons] = useState(null);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [unitList, setUnitList] = useState(null);
  const [chapterList, setChapterList] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  //modal
  const [modalVisible, setModalVisible] = useState(false);

  const [vimeoData, setVimeoData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    defApiFunc('getMemberPurchased', {
      token: token,
    }).then(response => {
      setPurchasedLessons(response.data);
      // console.log("getEducationDetail", response, "qwe");
    });

    // defApiFunc("getEducationContents", {
    //   token,
    //   productCode: "202301001",
    //   uplevel: 908,
    // }).then((response) => {
    //   console.log("getEducationContents", response);
    // });
  }, []);

  useEffect(() => {
    if (selectedPurchase) {
      defApiFunc('getEducationDetail', {
        token: token,
        productCode: selectedPurchase?.PRODUCTCODE.toString(),
      }).then(response => {
        setLessons(response.data);
        // console.log("getEducationDetail", response.data);
      });
    }
  }, [selectedPurchase]);
  useEffect(() => {
    if (selectedLesson?.UPLEVEL) {
      defApiFunc('getEducationContents', {
        token: token,
        productcode: selectedPurchase?.PRODUCTCODE.toString(),
        uplevel: 0,
      })
        .then(response => {
          // console.log("getEducationContents", response.data);
          setUnitList(response?.data);
        })
        .catch(err => {
          console.log('err', err);
        });
    }
  }, [selectedLesson]);

  useEffect(() => {
    if (selectedUnit?.ID) {
      defApiFunc('getEducationContents', {
        token: token,
        productcode: selectedPurchase?.PRODUCTCODE.toString(),
        uplevel: selectedUnit?.ID,
      })
        .then(response => {
          // console.log("getEducationContents", response.data);
          // console.log("UNITLIST", response.data);
          setChapterList(response?.data);
        })
        .catch(err => {
          console.log('err', err);
        });
    }
  }, [selectedUnit]);
  const [questions, setQuestions] = useState([]);
  console.log(unitList, 'asd');
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  useEffect(() => {
    if (selectedChapter?.VIMEO_ID) {
      defApiFunc('getQuestionsForVimeoId', {
        token: token,
        vimeoid: selectedChapter?.VIMEO_ID,
        listcount: 10,
      })
        .then(response => {
          // console.log("getEducationContents", response.data);
          // console.log("VIMEO", response.data);
          setQuestions(response?.data);
        })
        .catch(err => {
          console.log('err', err);
        });
    }
  }, [selectedChapter]);

  // console.log(questions, "qwe");

  useEffect(() => {
    if (selectedChapter?.VIMEO_ID) {
      fetch(`https://api.vimeo.com/videos/${selectedChapter?.VIMEO_ID}`, {
        method: 'GET',
        headers: {
          Authorization: 'bearer a46bab98f2588bc7b4a6065569895150',
        },
      })
        .then(response => response.json())
        .then(data => {
          const videoUrl = data?.files?.find(
            file => file?.rendition === userInfo.VIDEOQUALITY?.toString() + 'p',
          )?.link;
          setVimeoData(videoUrl);
        })
        .catch(err => console.log(err));
    }
  }, [selectedChapter]);
  const [kurum, setKurum] = useState(null);
  useEffect(() => {
    defApiFunc('getGroups', {
      token: token,
      uplevel: 15835,
    })
      .then(res => {
        setKurum(res.data);
      })
      .catch(err => {
        console.log('Error fetching students:', err);
        Alert.alert('Hata', 'Öğrenci listesi alınamadı.');
      });
  }, []);
  useEffect(() => {
    defApiFunc('getGroups', {
      token: token,

      uplevel: 17465,
    })
      .then(res => {
        console.log('res', res.data, 'qwe');

        setSchoolList(res.data);
      })
      .catch(err => {
        console.log('Error fetching students:', err);
        Alert.alert('Hata', 'Öğrenci listesi alınamadı.');
      });
  }, []);
  const [classList, setClassList] = useState([]);
  useEffect(() => {
    if (selectedSchool) {
      defApiFunc('getGroups', {
        token: token,
        uplevel: selectedSchool,
      })
        .then(res => {
          console.log('res', res.data, 'qwe');

          setClassList(res.data);
        })
        .catch(err => {
          console.log('Error fetching students:', err);
          Alert.alert('Hata', 'Öğrenci listesi alınamadı.');
        });
    }
  }, [selectedSchool]);
  console.log('selectedSchool', classList);
  const [selectedClassLevel, setSelectedClassLevel] = useState(null);
  const [classLevelList, setClassLevelList] = useState([]);
  // const MemoizedRenderHtml = React.memo(RenderHtml);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: COLORS.primary,
      }}>
      <View
        style={{
          width: SIZES.width,
          marginBottom: 10,
          backgroundColor: COLORS.purple,
        }}>
        <TouchableOpacity
          style={{
            zIndex: 2,
            marginLeft: 15,
            marginBottom: 10,
            marginTop: 15,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => {
            if (selectedLesson || selectedUnit || selectedChapter || selectedPurchase) {
              selectedChapter
                ? setSelectedChapter(null)
                : selectedUnit
                  ? setSelectedUnit(null)
                  : selectedLesson
                    ? setSelectedLesson(null)
                    : setSelectedPurchase(null);
            }
          }}>
          <TouchableOpacity
            onPress={() => {
              if (selectedLesson || selectedUnit || selectedChapter || selectedPurchase) {
                selectedChapter
                  ? setSelectedChapter(null)
                  : selectedUnit
                    ? setSelectedUnit(null)
                    : selectedLesson
                      ? setSelectedLesson(null)
                      : setSelectedPurchase(null);
              }
            }}>
            {(selectedLesson || selectedUnit || selectedChapter || selectedPurchase) && (
              <Icon
                onPress={() => {
                  if (selectedLesson || selectedUnit || selectedChapter || selectedPurchase) {
                    selectedChapter
                      ? setSelectedChapter(null)
                      : selectedUnit
                        ? setSelectedUnit(null)
                        : selectedLesson
                          ? setSelectedLesson(null)
                          : setSelectedPurchase(null);
                  }
                }}
                type={'feather'}
                size={24}
                color={'white'}
                name={'chevron-left'}
              />
            )}
          </TouchableOpacity>
          <Text
            numberOfLines={2}
            style={{
              ...BODY3,
              maxWidth: SIZES.width * 0.9,
              fontSize: 16,
              alignSelf: 'center',
              alignItems: 'center',
              paddingHorizontal: 5,
              color: COLORS.white,
            }}>
            {selectedChapter
              ? selectedChapter?.NAME
              : selectedUnit
                ? 'Bölümler'
                : selectedLesson
                  ? 'Üniteler'
                  : 'Derslerim'}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {loading ? (
          <View
            style={{
              flex: 1,
              width: SIZES.width,
              height: SIZES.height / 1.55,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={'large'} color={COLORS.blue} />
          </View>
        ) : (
          <View
            style={{
              width: SIZES.width,
              flex: 1,
            }}>
            {/*{purchasedLessons &&*/}
            {/*  !selectedPurchase &&*/}
            {/*  !selectedLesson &&*/}
            {/*  purchasedLessons.map((lesson) => {*/}
            {/*    return lessonListComp({*/}
            {/*      lesson,*/}
            {/*      setSelectedLesson: setSelectedPurchase,*/}
            {/*      setUnitList,*/}
            {/*    });*/}
            {/*  })}*/}
            {/*{!selectedPurchase && (*/}
            {/*  <PurchasedList*/}
            {/*    data={purchasedLessons}*/}
            {/*    setUnitList={setLessons}*/}
            {/*    setSelectedLesson={setSelectedPurchase}*/}
            {/*  />*/}
            {/*)}*/}
            {!selectedLesson && (
              <ScrollView
                style={{
                  flex: 1,
                }}
                contentContainerStyle={{
                  paddingBottom: 160,
                }}>
                <PurchasedList
                  data={groupedLessons}
                  setUnitList={setUnitList}
                  setSelectedLesson={setSelectedLesson}
                />
              </ScrollView>
            )}

            {selectedLesson && !selectedUnit && (
              <UnitList
                data={unitList}
                setSelectedUnit={setSelectedUnit}
                setChapterList={setChapterList}
              />
            )}
            {selectedUnit && !selectedChapter && (
              <ChapterList data={chapterList} setSelectedChapter={setSelectedChapter} />
            )}
            {selectedChapter && (
              <View
                style={{
                  flex: 1,
                  paddingTop: 20,
                  width: SIZES.width,
                }}>
                <View
                  style={{
                    width: isTablet() ? SIZES.width * 0.9 : 364,
                    height: isTablet() ? SIZES.height * 0.3 : 205,
                    backgroundColor: 'black',
                    marginBottom: 10,
                    alignSelf: 'center',
                  }}>
                  {/*<WebView*/}
                  {/*    */}
                  {/*  allowsInlineMediaPlayback={"true"}*/}
                  {/*  source={{*/}
                  {/*    uri: "https://player.vimeo.com/progressive_redirect/playback/855338150/rendition/360p/file.mp4?loc=external&oauth2_token_id=1643122405&signature=79787c514e2175b899852c9e27cca41c2e47c278696e6fa052c06572b0750b55",*/}
                  {/*  }}*/}
                  {/*/>*/}
                  {!isLoaded && (
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'black',
                        position: 'absolute',
                        zIndex: 1,
                        justifyContent: 'center',
                      }}>
                      <ActivityIndicator color={'white'} />
                    </View>
                  )}

                  <Video
                    ref={videoRef}
                    onPlaybackStatusUpdate={value => {
                      if (value.isPlaying) {
                        setIsVideoPlaying(true);
                      } else {
                        setIsVideoPlaying(false);
                      }
                    }}
                    shouldPlay={false}
                    onFullscreenUpdate={onFullscreenUpdate}
                    onError={error => console.log('error', error)}
                    onLoad={() => setIsLoaded(true)}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls={true}
                    source={{
                      uri: vimeoData,
                    }}
                  />
                  {/*<WebView*/}
                  {/*  allowsInlineMediaPlayback={true}*/}
                  {/*  allowsFullscreenVideo={false}*/}
                  {/*  source={{*/}
                  {/*    uri: "https://player.vimeo.com/progressive_redirect/playback/855338150/rendition/360p/file.mp4?loc=external&oauth2_token_id=1643122405&signature=79787c514e2175b899852c9e27cca41c2e47c278696e6fa052c06572b0750b55",*/}
                  {/*  }}*/}
                  {/*  javaScriptEnabled={true}*/}
                  {/*  scrollEnabled={false}*/}
                  {/*  injectedJavaScript={template(*/}
                  {/*    "https://player.vimeo.com/progressive_redirect/playback/855338150/rendition/360p/file.mp4?loc=external&oauth2_token_id=1643122405&signature=79787c514e2175b899852c9e27cca41c2e47c278696e6fa052c06572b0750b55",*/}
                  {/*  )}*/}
                  {/*  mediaPlaybackRequiresUserAction={false}*/}
                  {/*/>*/}
                </View>
                <View
                  style={{
                    width: SIZES.width * 0.9,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    flexDirection: 'row',
                    backgroundColor: COLORS.white,
                    justifyContent: 'space-between',
                    marginTop: 10,
                    borderRadius: 8,
                    alignSelf: 'center',
                    ...SHADOWS.shadowOne,
                  }}>
                  <View
                    style={{
                      maxWidth: '55%',
                    }}>
                    <Text style={{ ...H1, fontSize: 16 }}>{selectedChapter.NAME}</Text>
                    <Text style={{ ...H1, fontSize: 16 }}>{/*{selectedChapter.explanation}*/}</Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'flex-end',
                    }}>
                    <TouchableOpacity
                      onPress={() => setModalVisible(true)}
                      style={{
                        backgroundColor: '#E64848',
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          ...BODY4,
                          color: COLORS.white,
                          fontSize: 12,
                          paddingHorizontal: 10,
                          paddingVertical: 8,
                        }}>
                        Eğitmene Puan Ver
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        ...BODY2,
                        fontSize: 12,
                        marginTop: 5,
                      }}>
                      {selectedChapter.TEACHER}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: SIZES.width * 0.85,
                    flexDirection: 'row',
                    alignSelf: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedTab(1);
                    }}
                    style={{
                      width: (SIZES.width * 0.85) / 2 - 10,
                      height: 36,

                      backgroundColor: selectedTab === 1 ? COLORS.primaryDark : COLORS.white,
                      marginTop: 16,
                      marginBottom: 4,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 8,
                      ...SHADOWS.shadowOne,
                    }}>
                    <Text
                      style={{
                        ...BODY4,
                        fontSize: 12,
                        color: selectedTab === 1 ? COLORS.white : COLORS.black,
                      }}>
                      Bölümler
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedTab(0);
                    }}
                    style={{
                      width: (SIZES.width * 0.85) / 2 - 10,
                      height: 36,
                      backgroundColor: selectedTab === 0 ? COLORS.primaryDark : COLORS.white,
                      marginTop: 16,
                      marginBottom: 4,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 8,
                      ...SHADOWS.shadowOne,
                    }}>
                    <Text
                      style={{
                        ...BODY4,
                        fontSize: 12,
                        color: selectedTab === 0 ? COLORS.white : COLORS.black,
                      }}>
                      Örnek Sorular
                    </Text>
                  </TouchableOpacity>
                </View>
                {selectedTab === 0 ? (
                  <ScrollView
                    contentContainerStyle={{
                      alignItems: 'center',
                      paddingBottom: 120,
                    }}>
                    {questions?.map((question, index) =>
                      questionListComp({
                        question,
                        index,
                        setSelectedChapter,
                        setQuestionModalVisible,
                        setSelectedQuestion,
                        setQuestionModalType,
                      }),
                    )}
                  </ScrollView>
                ) : (
                  <ChapterList data={chapterList} setSelectedChapter={setSelectedChapter} />
                )}
                {questions.length === 0 && (
                  <View>
                    <Text
                      style={{
                        ...BODY4,
                        color: COLORS.black,
                      }}>
                      Soru Bulunamadı
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        )}
      </View>
      <ReviewTeacherModal
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
        selectedChapter={selectedChapter}
        token={token}
      />
      {/*{reviewTeacherModal({*/}
      {/*  isVisible: modalVisible,*/}
      {/*  setIsVisible: setModalVisible,*/}
      {/*  selectedChapter,*/}
      {/*  token,*/}
      {/*})}*/}
      <QuestionModal
        onFullscreenUpdate={onFullscreenUpdate}
        token={token}
        isVisible={questionModalVisible}
        setIsVisible={setQuestionModalVisible}
        selectedQuestion={selectedQuestion}
        questionModalType={questionModalType}
        setQuestionModalType={setQuestionModalType}
        userInfo={userInfo}
        innerRef={questionVideoRef}
      />
      <TouchableOpacity
        onPress={() => {
          Linking.openURL('https://osinif.com');
        }}
        style={{
          backgroundColor: COLORS.primaryDark,
          borderRadius: 100,
          position: 'absolute',
          width: 60,
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          bottom: 90,
          right: 20,
        }}>
        <Text
          style={{
            ...FONTS.BODY1,
            color: COLORS.white,
            fontSize: 12,
          }}>
          Satın Al
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default EducationScreen;
