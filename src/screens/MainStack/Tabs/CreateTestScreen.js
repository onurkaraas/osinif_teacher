import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  FlatList,
} from 'react-native';
import { Image } from 'expo-image';
import React, { useContext, useEffect, useState } from 'react';
import { defApiFunc, FILE_URL, REF_FILE_URL } from '../../../api';
import { AuthContext } from '../../../context/AuthContext';
import lessonListComp from '../../../components/education/lessonListComp';
import { BODY3, BODY4, COLORS, FONTS, SIZES } from '../../../constants/theme';
import { CheckBox, Icon, Input, Switch } from '@rneui/base';
import Modal from 'react-native-modal';
import { mainButton } from '../../../components/buttons';
import notificationSwitch from '../../../components/settings/notificationSwitch';
import textInput from '../../../components/main/textInput';
import { FlashList } from '@shopify/flash-list';
import ImageView from 'react-native-image-viewing';
import Spinner from 'react-native-loading-spinner-overlay';
import { useIsFocused } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isTablet } from '../../../helpers/deviceInfo';
import { show } from '../../../../node_modules/cli-cursor/index.d';
import PickerWithLabel from '../../../components/main/pickerWithLabel';

const CreateTestScreen = ({ navigation }) => {
  const { token } = useContext(AuthContext);
  const isFocused = useIsFocused();
  const { user, userInfo } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [purchasedLessons, setPurchasedLessons] = useState([]);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [unitList, setUnitList] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  //settingsModal
  const [isVisible, setIsVisible] = useState(false);

  //0 all questions, 2 except old questions
  const [param, setParam] = useState(false);
  const [maxQuestion, setMaxQuestion] = useState('10');
  const [questionList, setQuestionList] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState([]);
  const [selectedQuestionCodeList, setSelectedQuestionCodeList] = useState([]);
  //full screen image iew
  const [images, setImages] = useState([]);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  //refresh list
  const [refreshing, setRefreshing] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  //save modal
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [studentList, setStudentList] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showStudentModal, setShowStudentModal] = useState(false);
  // First, add a new loading state for the save operation
  const [savingTest, setSavingTest] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  useEffect(() => {
    defApiFunc('getMemberPurchased', {
      token: token,
    }).then(response => {
      setPurchasedLessons(response.data);
      setLoading(false);
      setSelectedPurchase(null);
      setSelectedQuestionCodeList([]);
      setSelectedQuestion([]);
      setSelectedUnit(null);
      // console.log("getEducationDetail", response, "qwe");
    });

    // defApiFunc("getEducationContents", {
    //   token,
    //   productCode: "202301001",
    //   uplevel: 908,
    // }).then((response) => {
    //   console.log("getEducationContents", response);
    // });
  }, [isFocused]);
  const [schoolList, setSchoolList] = useState([]);
  useEffect(() => {
    if (selectedPurchase) {
      setLoading(true);
      defApiFunc('getProductUnits', {
        token,
        productCode: selectedPurchase?.PRODUCTCODE,
      }).then(
        res => {
          setLoading(false);

          setUnitList([
            {
              ID: 0,
              NAME: 'Tüm Üniteler',
            },
            ...res.data,
          ]);
        },
        err => {
          console.log('err', err);
          Alert.alert('Uyarı', 'Üniteler getirilirken bir hata oluştu.');
          setLoading(false);
        },
      );
    }
  }, [selectedPurchase]);

  useEffect(() => {
    if (selectedUnit && selectedPurchase) {
      setLoading(true);
      defApiFunc('getQuestionsForUplevel', {
        token,
        productcode: selectedPurchase.PRODUCTCODE,
        uplevel: selectedUnit.ID,
        maxQuestion: maxQuestion,
        selected: '',
        param: param ? 0 : 2,
        users: '',
      }).then(
        res => {
          if (res.data.length > 0) {
            setQuestionList(res.data);
            setSelectAll(false);
            setImages(
              res.data.map(item => {
                return {
                  uri: FILE_URL + item.PATH + '/' + item.FILENAME,
                };
              }),
            );
            setRefreshing(false);
            setLoading(false);
          } else {
            setRefreshing(false);
            setQuestionList([]);
            setSelectedUnit(null);
            setLoading(false);
            Alert.alert('Uyarı', 'Bu ünite için soru bulunamadı.');
          }
        },
        err => {
          setRefreshing(false);

          console.log('err', err);
          Alert.alert('Uyarı', 'Sorular getirilirken bir hata oluştu.');
          setLoading(false);
        },
      );
    }
  }, [selectedUnit, param, maxQuestion, refreshing]);
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
  useEffect(() => {
    if (selectedQuestionCodeList.length === 0) {
      setSelectedQuestion([]);
    } else {
      const newSelectedQuestions = questionList.filter(question =>
        selectedQuestionCodeList.includes(question.CODE),
      );
      const oldSelectedQuestions = selectedQuestion.filter(question => {
        return selectedQuestionCodeList.includes(question.CODE);
      });
      const filterSame = [...newSelectedQuestions, ...oldSelectedQuestions].filter(
        (item, index, self) => {
          return index === self.findIndex(t => t.CODE === item.CODE);
        },
      );
      setSelectedQuestion(filterSame);
    }
  }, [selectedQuestionCodeList]);
  const [classLevel, setClassLevel] = useState(null);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 5,
      }}>
      <View
        style={{
          width: '100%',
          marginVertical: 10,
          paddingHorizontal: 5,
          paddingRight: selectedPurchase || selectedUnit ? 10 : 5,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => {
            questionList.length > 0 && selectedUnit
              ? setSelectedUnit(null)
              : setSelectedPurchase(null);
          }}
          style={{
            alignItems: 'center',
            backfaceVisibility: 'hidden',
            flexDirection: 'row',
          }}>
          {selectedPurchase || selectedUnit ? (
            <TouchableOpacity
              style={{
                marginTop: 2.5,
              }}
              onPress={() => {
                questionList.length > 0 && selectedUnit
                  ? setSelectedUnit(null)
                  : setSelectedPurchase(null);
              }}>
              <Icon size={26} type={'entypo'} name={'chevron-left'} />
            </TouchableOpacity>
          ) : null}
          <View
            style={{
              borderBottomColor: COLORS.blue,
              borderBottomWidth: 2,
            }}>
            <Text
              style={{
                ...BODY3,
                fontSize: 16,
                paddingHorizontal: 5,
                color: COLORS.black,
              }}>
              {purchasedLessons && !selectedPurchase
                ? 'Eğitim Seçiniz'
                : selectedPurchase && !selectedUnit
                  ? 'Ünite Seçiniz'
                  : selectedUnit && questionList.length > 0
                    ? 'Sorular'
                    : 'Konu Seçiniz'}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setIsVisible(true);
          }}>
          <Icon color={COLORS.blue} name={'settings'} />
        </TouchableOpacity>
      </View>
      {!selectedUnit && (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignSelf: 'center',
          }}
          style={{
            width: '100%',
          }}>
          {purchasedLessons &&
            !selectedPurchase &&
            purchasedLessons.map(lesson => {
              return lessonListComp({
                lesson,
                setSelectedLesson: setSelectedPurchase,
                label:
                  `${parseInt(lesson.VIDEOLEVEL) + parseInt('4')}` +
                  '. sınıf' +
                  ' - ' +
                  lesson.NAME,
              });
            })}
          {selectedPurchase &&
            unitList.length > 0 &&
            !selectedUnit &&
            unitList.map(unit => {
              return lessonListComp({
                lesson: unit,
                setSelectedLesson: setSelectedUnit,
              });
            })}
        </ScrollView>
      )}
      {selectedUnit && questionList.length > 0 && (
        <View
          style={{
            flex: 1,
            width: '100%',
          }}>
          <Text
            style={{
              ...BODY3,
              alignSelf: 'center',
              fontSize: 16,
              marginBottom: selectedQuestionCodeList.length > 0 ? 2.5 : 8,
            }}>
            Testte bulunacak soruları seçiniz.
          </Text>
          {selectedQuestionCodeList.length > 0 && (
            <Text
              style={{
                ...BODY3,
                alignSelf: 'center',
                fontSize: 16,
                marginVertical: 2.5,
              }}>
              Seçilen Soru Sayısı:{' '}
              <Text
                style={{
                  fontSize: 18,
                  color: COLORS.blue,
                }}>
                {selectedQuestionCodeList.length}
              </Text>
            </Text>
          )}
          <View
            style={{
              flexDirection: 'row',
              width: SIZES.width * 0.925,
              marginBottom: 8,
              marginTop: 2.5,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                ...FONTS.BODY4,
                fontSize: 16,
                color: COLORS.black,
              }}>
              Tümünü Seç
            </Text>
            <Switch
              color={COLORS.blue}
              value={selectAll}
              onValueChange={() => {
                setSelectAll(!selectAll);
                if (selectAll) {
                  setSelectedQuestionCodeList(
                    selectedQuestionCodeList.filter(
                      question => !questionList.map(item => item.CODE).includes(question),
                    ),
                  );
                } else {
                  console.log('SELECTALL');
                  setSelectedQuestionCodeList([
                    ...selectedQuestionCodeList,
                    ...questionList
                      .filter(item => !selectedQuestionCodeList.includes(item.CODE))
                      .map(item => item.CODE),
                  ]);
                }
              }}
            />
          </View>
          <FlashList
            estimatedItemSize={SIZES.width * 0.4}
            extraData={selectedQuestionCodeList}
            data={questionList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (selectedQuestionCodeList.includes(item.CODE)) {
                      setSelectedQuestionCodeList(
                        selectedQuestionCodeList.filter(question => question !== item.CODE),
                      );
                      selectedQuestion.map((question, i) => {
                        if (question?.CODE === item?.CODE) {
                          setSelectedQuestion(
                            selectedQuestion.filter(
                              (question, index) => question?.CODE !== item?.CODE,
                            ),
                          );
                        }
                      });
                    } else {
                      setSelectedQuestionCodeList([...selectedQuestionCodeList, item.CODE]);
                      setSelectedQuestion([...selectedQuestion, item]);
                    }
                  }}
                  style={{
                    borderWidth: 2,
                    borderStyle: 'dashed',
                    borderColor: selectedQuestionCodeList.includes(item.CODE)
                      ? COLORS.blue
                      : COLORS.lightGrayTwo,
                    paddingVertical: 5,
                    borderRadius: 8,
                    paddingBottom: 10,
                    marginBottom: 10,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '100%',
                      paddingLeft: 13,
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        ...BODY4,
                        fontSize: 16,
                        color: COLORS.black,
                        marginBottom: 10,
                      }}>
                      {index + 1}. Soru
                    </Text>
                    <CheckBox
                      containerStyle={{
                        padding: 0,
                        margin: 0,
                      }}
                      checked={selectedQuestionCodeList.includes(item.CODE)}
                      color={COLORS.blue}
                      value={selectedQuestionCodeList.includes(item.CODE)}
                      onPress={() => {
                        if (selectedQuestionCodeList.includes(item.CODE)) {
                          setSelectedQuestionCodeList(
                            selectedQuestionCodeList.filter(question => question !== item.CODE),
                          );
                        } else {
                          setSelectedQuestionCodeList([...selectedQuestionCodeList, item.CODE]);
                        }
                      }}
                    />
                  </View>
                  <View>
                    {loading ? (
                      <View
                        style={{
                          width: SIZES.width * 0.875,
                          height: SIZES.width * 0.7,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: COLORS.lightGrayThree,
                        }}>
                        <Image
                          onError={e => {
                            console.log('errorIMAGE', e);
                          }}
                          placeholder={require('../../../../assets/gifs/loadingLogo.gif')}
                          source={require('../../../../assets/gifs/loadingLogo.gif')}
                          contentFit={'contain'}
                          style={{
                            width: SIZES.width * 0.875,
                            height: isTablet() ? 300 : SIZES.width * 0.7,
                            backgroundColor: loading ? COLORS.white : COLORS.lightGrayThree,
                          }}
                        />
                      </View>
                    ) : (
                      <Image
                        onError={e => {
                          console.log('errorIMAGE', e);
                        }}
                        placeholder={require('../../../../assets/gifs/loadingLogo.gif')}
                        source={
                          loading
                            ? require('../../../../assets/gifs/loadingLogo.gif')
                            : {
                                uri: FILE_URL + item.PATH + '/' + item.FILENAME,
                              }
                        }
                        contentFit={'contain'}
                        style={{
                          width: SIZES.width * 0.875,
                          height: SIZES.width * 0.7,
                          backgroundColor: loading ? COLORS.white : COLORS.lightGrayThree,
                        }}
                      />
                    )}
                    <TouchableOpacity
                      onPress={() => {
                        setImageIndex(index);
                        setIsImageVisible(true);
                      }}
                      style={{
                        position: 'absolute',
                        top: 5,
                        borderRadius: 50,
                        right: 5,
                      }}>
                      <Icon
                        size={28}
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.8)',
                          borderRadius: 50,
                          padding: 2,
                        }}
                        color={'rgba(0, 0, 0,.75)'}
                        type={'feather'}
                        name={'zoom-in'}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
      <Modal
        backdropColor={'#000'}
        backdropOpacity={0}
        visible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        animationType="slideInUp"
        onRequestClose={() => setIsVisible(false)}
        style={{
          margin: 0,
          flex: 1,
          zIndex: 22,
          alignItems: 'center',
          paddingBottom: 100,
          backgroundColor: 'rgba(0,0,0,0.7)',
          justifyContent: 'center',
        }}>
        <KeyboardAvoidingView>
          <View
            style={{
              alignItems: 'center',
              paddingVertical: 16,
              paddingTop: 8,
              width: SIZES.width * 0.9,
              borderRadius: 20,
              paddingHorizontal: 16,
              backgroundColor: 'white',
              shadowOffset: {
                width: 2,
                height: 2,
              },
              shadowOpacity: 0.5,
              shadowRadius: 13,
              elevation: 3,

              shadowColor: '#fff',
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
                Test Ayarları
              </Text>
              <TouchableOpacity onPress={() => setIsVisible(false)}>
                <Icon name={'close'} size={24} />
              </TouchableOpacity>
            </View>

            {/*<Text*/}
            {/*  style={{*/}
            {/*    ...BODY3,*/}
            {/*    fontSize: 16,*/}
            {/*    color: COLORS.darkGray,*/}
            {/*    textAlign: "center",*/}
            {/*    marginBottom: 16,*/}
            {/*  }}*/}
            {/*>*/}
            {/*  Sistemde kayıtlı mail adresinizi giriniz. Bilgileriniz kayıtlı cep*/}
            {/*  telefonunuza gönderilecektir.*/}
            {/*</Text>*/}
            {notificationSwitch({
              title: 'Daha Önce Sorulan' + '\n' + 'Soruları Dahil Et',
              value: param,
              setValue: setParam,
            })}

            <View
              style={{
                alignItems: 'center',
                marginBottom: 16,
              }}>
              {textInput({
                placeholder: 'Listelenecek Maksimum Soru Sayısı',
                value: maxQuestion,
                onChangeText: text => {
                  setMaxQuestion(text);
                },
                keyboardType: 'numeric',
                label: 'Listelenecek Maks. Soru Sayısı',
              })}
            </View>
            {mainButton({
              text: 'Kaydet',
              backgroundColor: '#445286',
              onPress: () => {
                setShowStudentModal(false);
              },
            })}
          </View>
        </KeyboardAvoidingView>
      </Modal>
      {selectedQuestionCodeList?.length > 0 && (
        <View
          style={{
            position: 'absolute',
            bottom: 100,
            alignSelf: 'center',
          }}>
          {mainButton({
            text: 'Öğrenci Seç',
            backgroundColor: COLORS.blue,
            onPress: () => {
              setShowStudentModal(true);
            },
          })}
        </View>
      )}
      <Modal
        backdropColor={'#000'}
        backdropOpacity={0}
        visible={saveModalVisible}
        onBackdropPress={() => setSaveModalVisible(false)}
        animationType="slideInUp"
        onRequestClose={() => setSaveModalVisible(false)}
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
                marginBottom: 2.5,
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
                Test Oluştur
              </Text>
              <TouchableOpacity onPress={() => setSaveModalVisible(false)}>
                <Icon name={'close'} size={24} />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                ...BODY3,
                alignSelf: 'center',
                paddingBottom: 10,
                fontSize: 16,
              }}>
              Seçilen Soru Sayısı:{' '}
              <Text
                style={{
                  fontSize: 18,
                  color: COLORS.blue,
                }}>
                {selectedQuestionCodeList.length}
              </Text>
            </Text>

            {/*<Text*/}
            {/*  style={{*/}
            {/*    ...BODY3,*/}
            {/*    fontSize: 16,*/}
            {/*    color: COLORS.darkGray,*/}
            {/*    textAlign: "center",*/}
            {/*    marginBottom: 16,*/}
            {/*  }}*/}
            {/*>*/}
            {/*  Sistemde kayıtlı mail adresinizi giriniz. Bilgileriniz kayıtlı cep*/}
            {/*  telefonunuza gönderilecektir.*/}
            {/*</Text>*/}
            <View style={{ marginVertical: 10 }}>
              <Text
                style={{
                  ...BODY3,
                  fontSize: 16,
                  marginBottom: 10,
                }}>
                Seçilen Öğrenci Sayısı: {selectedStudents.length}
              </Text>

              <View
                style={{
                  maxHeight: 200,
                  borderWidth: 1,
                  borderColor: COLORS.lightGrayTwo,
                  borderRadius: 8,
                  padding: 10,
                }}>
                <FlashList
                  estimatedItemSize={50}
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
                paddingTop: 10,
              }}>
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
                      // Deselect all
                      setSelectedStudents([]);
                    } else {
                      // Select all
                      setSelectedStudents(studentList.map(student => student.ID));
                    }
                  }}
                />
              </View>
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
      <ImageView
        swipeToCloseEnabled={true}
        images={images}
        imageIndex={imageIndex}
        visible={isImageVisible}
        onRequestClose={() => setIsImageVisible(false)}
      />
      {loading && (
        <Spinner
          overlayColor={'rgba(0, 0, 0, 0.45)'}
          textContent={'Yükleniyor...'}
          textStyle={{
            ...FONTS.BODY4,
            fontSize: 20,
            color: 'white',
            marginBottom: 20,
          }}
          visible={true}
        />
      )}
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
      <Modal
        backdropColor={'#000'}
        backdropOpacity={0}
        visible={showStudentModal}
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
              <TouchableOpacity onPress={() => setShowStudentModal(false)}>
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
export default CreateTestScreen;
