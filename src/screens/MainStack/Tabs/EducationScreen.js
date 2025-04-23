import { BODY2, BODY3, BODY4, H1 } from '../../../constants';
import { COLORS, FONTS, SHADOWS, SIZES } from '../../../constants/theme';
import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Linking,
} from 'react-native';
import { AirbnbRating, Icon } from '@rneui/base';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { API_URL, defApiFunc, FILE_URL, REF_FILE_URL } from '../../../api';
import { AuthContext } from '../../../context/AuthContext';
import { ResizeMode, Video } from 'expo-av';
import questionListComp from '../../../components/screens/education/questionListComp';
import QuestionModal from '../../../components/modals/QuestionModal';
import ReviewTeacherModal from '../../../components/modals/reviewTeacherModal';
import LessonList from '../../../components/screens/education/lists/LessonList';
import UnitList from '../../../components/screens/education/lists/UnitList';
import ChapterList from '../../../components/screens/education/lists/ChapterList';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useIsFocused } from '@react-navigation/native';
import { isTablet } from '../../../helpers/deviceInfo';
import PurchasedList from '../../../components/screens/education/lists/PurchasedList';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Switch } from '@rneui/base';
import PickerWithLabel from '../../../components/main/pickerWithLabel';
import { mainButton } from '../../../components/buttons';
import Spinner from 'react-native-loading-spinner-overlay';
import textInput from '../../../components/main/textInput';

const EducationScreen = ({ navigation }) => {
  const { token, userInfo } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const onFullscreenUpdate = async ({ fullscreenUpdate }) => {
    switch (fullscreenUpdate) {
      case (0, 1):
      case isFocused:
        await ScreenOrientation.unlockAsync();
        // only on Android required
        break;
      case (2, 3):
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP); // only on Android required
        break;
    }
  };

  const [lessons, setLessons] = useState([]);
  const [purchasedLessons, setPurchasedLessons] = useState([]);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [unitList, setUnitList] = useState(null);
  const [chapterList, setChapterList] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedQuestionCodeList, setSelectedQuestionCodeList] = useState([]);

  //modal
  const [modalVisible, setModalVisible] = useState(false);
  const [questionModalVisible, setQuestionModalVisible] = useState(false);
  const [questionModalType, setQuestionModalType] = useState('question');

  const [vimeoData, setVimeoData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [studentList, setStudentList] = useState([]);
  const [schoolList, setSchoolList] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedClassLevel, setSelectedClassLevel] = useState(null);
  const [classLevelList, setClassLevelList] = useState([]);
  const [savingTest, setSavingTest] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const questionVideoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  useEffect(() => {
    if (!isFocused && videoRef?.current) {
      videoRef?.current?.pauseAsync();
    }
  }, [isFocused]);

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
    setLoading(true);
    if (purchasedLessons.length > 0) {
      let arr = [];

      purchasedLessons.map(lesson => {
        defApiFunc('getEducationDetail', {
          token: token,
          productCode: lesson.PRODUCTCODE.toString(),
        }).then(response => {
          arr = [...arr, ...response.data];
          setLessons(arr);
        });
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [purchasedLessons]);

  useEffect(() => {
    if (selectedLesson?.CODE) {
      setLoading(true);

      defApiFunc('getEducationContents', {
        token: token,
        productcode: selectedLesson.CODE,
        uplevel: 0,
      })
        .then(response => {
          // console.log("getEducationContents", response.data);
          setUnitList(response?.data);
        })
        .catch(err => {
          console.log('err', err);
        })
        .finally(() => setLoading(false));
    }
  }, [selectedLesson]);

  useEffect(() => {
    if (selectedUnit?.ID) {
      setLoading(true);
      defApiFunc('getEducationContents', {
        token: token,
        productcode: selectedLesson?.CODE,
        uplevel: selectedUnit?.ID,
      })
        .then(response => {
          // console.log("getEducationContents", response.data);
          // console.log("UNITLIST", response.data);
          setChapterList(response?.data);
        })
        .catch(err => {
          console.log('err', err);
        })
        .finally(() => setLoading(false));
    }
  }, [selectedUnit]);

  useEffect(() => {
    if (selectedChapter?.VIMEO_ID) {
      setLoading(true);
      fetch(`https://api.vimeo.com/videos/${selectedChapter?.VIMEO_ID}`, {
        method: 'GET',
        headers: {
          Authorization: 'bearer a46bab98f2588bc7b4a6065569895150',
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.files, 'data');
          let videoUrl = data?.files?.find(
            file => file?.rendition === userInfo.VIDEOQUALITY?.toString() + 'p',
          )?.link;
          if (!videoUrl) {
            videoUrl =
              data?.files?.find(file => file?.quality === '720p')?.link ?? data?.files[0]?.link;
          }
          setVimeoData(videoUrl);
        })
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [selectedChapter]);
  const [kurum, setKurum] = useState([]);
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
  console.log(chapterList);

  useEffect(() => {
    if (selectedChapter?.VIMEO_ID) {
      setLoading(true);

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
        })
        .finally(() => setLoading(false));
    }
  }, [selectedChapter]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  console.log(selectedUnit, 'lessons');
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
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [groupedLessons, setGroupedLessons] = useState([]);
  useEffect(() => {
    const groupedArray = lessons.reduce((acc, curr) => {
      const existingGroup = acc.find(group => group[0].VIDEOLEVEL === curr.VIDEOLEVEL);

      if (existingGroup) {
        existingGroup.push(curr); // Add the current object to the existing group
      } else {
        acc.push([curr]); // Create a new group with the current object
      }

      return acc;
    }, []);

    setGroupedLessons(groupedArray);
  }, [lessons]);
  console.log(JSON.stringify(groupedLessons), 'groupedLessons');
  const isFocused = useIsFocused();
  const [selectedTab, setSelectedTab] = useState(0);

  let videoRef = useRef(null);

  useEffect(() => {
    if (!isFocused && videoRef?.current) {
      videoRef?.current?.pauseAsync();
    }
  }, [isFocused]);

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
                      onPress={() => setSaveModalVisible(true)}
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
                        Ödev Ver
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
      <Modal
        backdropColor={'#000'}
        backdropOpacity={0}
        visible={saveModalVisible}
        onBackdropPress={() => setShowStudentModal(false)}
        animationType="slideInUp"
        onRequestClose={() => setShowStudentModal(false)}
        style={{
          margin: 0,
          paddingVertical: 50,
          flex: 1,
          height: SIZES.height,
          width: SIZES.width,
          zIndex: 22,
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.7)',
          justifyContent: 'center',
        }}>
        <View
          style={{
            paddingVertical: 16,
            paddingTop: 8,
            borderRadius: 20,
            backgroundColor: 'white',
            width: SIZES.width * 0.9,
            height: SIZES.height * 0.8,
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowOpacity: 0.5,
            shadowRadius: 13,
            elevation: 3,
            shadowColor: '#fff',
          }}>
          <KeyboardAwareScrollView
            contentContainerStyle={{
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                width: '100%',
                paddingVertical: 8,
                marginBottom: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Text
                style={{
                  ...BODY4,
                  fontSize: 20,
                  position: 'absolute',
                  width: '100%',
                  textAlign: 'center',
                  color: COLORS.black,
                }}>
                Öğrenci Seç
              </Text>
              <TouchableOpacity onPress={() => setSaveModalVisible(false)}>
                <Icon name={'close'} size={24} />
              </TouchableOpacity>
            </View>

            <View style={{ marginVertical: 10 }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  marginBottom: 8,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    ...BODY3,
                    fontSize: 16,
                  }}>
                  Seçilen Öğrenci Sayısı: {selectedStudents.length}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      ...FONTS.BODY4,
                      fontSize: 16,
                      color: COLORS.black,
                      marginRight: 10,
                    }}>
                    Tümünü Seç
                  </Text>
                  <Switch
                    color={COLORS.blue}
                    value={selectedStudents.length === studentList.length}
                    onValueChange={() => {
                      if (selectedStudents.length === studentList.length) {
                        setSelectedStudents([]);
                      } else {
                        setSelectedStudents(studentList.map(student => student.ID));
                      }
                    }}
                  />
                </View>
              </View>
              <PickerWithLabel
                type={'SCROLLVIEW'}
                placeholder={'Şehir Seçiniz'}
                searchPlaceholder={'Şehir Ara'}
                setValue={setSelectedSchool}
                selectedValue={selectedSchool}
                setItems={setSchoolList}
                shadow={true}
                onValueChange={value => {
                  setSelectedSchool(value);
                  setSelectedClass(null);
                  // Get students for selected school
                }}
                items={schoolList}
                label={'Kurum Seç'}
                value={'ID'}
                itemKey={'NAME'}
                style={{ height: 50, width: '100%' }}
              />
              <PickerWithLabel
                type={'SCROLLVIEW'}
                placeholder={'Sinif Seçiniz'}
                setValue={setSelectedClass}
                selectedValue={selectedClass}
                setItems={setClassList}
                shadow={true}
                onValueChange={value => {
                  setSelectedClass(value);
                  // Get students for selected class
                  defApiFunc('getGroups', {
                    token: token,
                    uplevel: value,
                  })
                    .then(res => {
                      console.log('res', res.data, 'asd', value);
                      setClassLevelList(res.data);
                    })
                    .catch(err => {
                      console.log('Error fetching students:', err);
                      Alert.alert('Hata', 'Öğrenci listesi alınamadı.');
                    });
                }}
                items={classList}
                label={'Sınıf Seç'}
                value={'ID'}
                itemKey={'NAME'}
                style={{ height: 50, width: '100%', marginTop: 10 }}
              />
              <PickerWithLabel
                type={'SCROLLVIEW'}
                placeholder={'Sinif Seçiniz'}
                setValue={setSelectedClassLevel}
                selectedValue={selectedClassLevel}
                setItems={setClassLevelList}
                shadow={true}
                onValueChange={value => {
                  defApiFunc('getAccountsInClass', {
                    id: value,
                  })
                    .then(res => {
                      setStudentList(res.data);
                    })
                    .catch(err => {
                      console.log('Error fetching students:', err);
                      Alert.alert('Hata', 'Öğrenci listesi alınamadı.');
                    });
                }}
                items={classLevelList}
                label={'Sınıf Seç'}
                value={'ID'}
                itemKey={'NAME'}
                style={{ height: 50, width: '100%', marginTop: 10 }}
              />
              {savingTest && (
                <Spinner
                  overlayColor={'rgba(0, 0, 0, 0.45)'}
                  textContent={'Test oluşturuluyor...'}
                  textStyle={{
                    ...FONTS.BODY4,
                    fontSize: 20,
                    color: 'white',
                    marginBottom: 20,
                  }}
                  visible={true}
                />
              )}
              <View
                style={{
                  height: SIZES.height * 0.4,
                  borderWidth: 1,
                  borderColor: COLORS.lightGrayTwo,
                  borderRadius: 8,
                  padding: 10,
                }}>
                <FlatList
                  data={studentList}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        if (selectedStudents.includes(item.ID)) {
                          setSelectedStudents(selectedStudents.filter(id => id !== item.ID));
                        } else {
                          setSelectedStudents([...selectedStudents, item.ID]);
                        }
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 8,
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.lightGrayTwo,
                      }}>
                      <CheckBox
                        checked={selectedStudents.includes(item.ID)}
                        onPress={() => {
                          if (selectedStudents.includes(item.ID)) {
                            setSelectedStudents(selectedStudents.filter(id => id !== item.ID));
                          } else {
                            setSelectedStudents([...selectedStudents, item.ID]);
                          }
                        }}
                        containerStyle={{
                          padding: 0,
                          margin: 0,
                        }}
                      />
                      <Text
                        style={{
                          ...BODY4,
                          marginLeft: 10,
                          color: COLORS.black,
                        }}>
                        {item.NAME} {item.LASTNAME}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>

            {textInput({
              placeholder: 'Exam Adı',
              value: name,
              onChangeText: text => {
                setName(text);
              },
              label: 'Ödev Adı',
            })}
            {textInput({
              placeholder: 'Exam Açıklaması',
              value: description,
              onChangeText: text => {
                setDescription(text);
              },
              label: 'Ödev Açıklaması',
            })}

            <View
              style={{
                alignSelf: 'center',
                paddingTop: 20,
                paddingBottom: 10,
              }}>
              {mainButton({
                text: 'Kaydet',
                backgroundColor: '#445286',
                onPress: () => {
                  console.log(
                    selectedQuestionCodeList.length,
                    name.length,
                    selectedStudents.length,
                    'LENGTH',
                  );
                  if (selectedQuestionCodeList.length > 0 && selectedStudents.length > 0) {
                    setSavingTest(true); // Show loading
                    defApiFunc('setUserExam', {
                      token: token,
                      examtype: 2,
                      m_name: name,
                      m_description: description,
                      questions: selectedQuestionCodeList.join(','),
                      start: '02.10.2025',
                      expire: '07.12.2025',
                      users: selectedStudents.join(','),
                    })
                      .then(res => {
                        setSavingTest(false); // Hide loading
                        if (res.data[0].DATA) {
                          setSaveModalVisible(false);
                          setShowStudentModal(false);
                          setSelectedStudents([]);
                          Alert.alert('Test oluşturuldu.');
                        } else {
                          Alert.alert(res.data[0].MESSAGE);
                        }
                      })
                      .catch(err => {
                        setSavingTest(false); // Hide loading on error
                        console.log(err.data);
                        Alert.alert('Hata', 'Test oluşturulurken bir hata oluştu.');
                      });
                  } else {
                    Alert.alert('Lütfen tüm alanları doldurunuz ve en az bir öğrenci seçiniz.');
                  }
                },
              })}
            </View>
          </KeyboardAwareScrollView>
        </View>
      </Modal>
    </View>
  );
};
export default EducationScreen;
