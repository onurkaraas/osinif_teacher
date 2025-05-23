import { ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { BODY3, BODY4, COLORS, SIZES } from '../../constants/theme';
import { Icon } from '@rneui/base';
import { Image } from 'expo-image';
import { defApiFunc, FILE_URL } from '../../api';
import { answers } from '../../data/answers';
import Modal from 'react-native-modal';
import React, { useEffect, useState } from 'react';
import { ResizeMode, Video } from 'expo-av';
import ImageView from 'react-native-image-viewing';
import { isTablet } from '../../helpers/deviceInfo';

const QuestionModal = ({
  isVisible,
  setIsVisible,
  selectedQuestion,
  questionModalType,
  setQuestionModalType,
  userInfo,
  token,
  innerRef,
  onFullscreenUpdate,
}) => {
  const [vimeoData, setVimeoData] = useState(null);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const images = [
    {
      uri: FILE_URL + selectedQuestion?.PATH + '/' + selectedQuestion?.FILENAME,
    },
  ];

  const [result, setResult] = useState({});
  const [imageVisible, setImageVisible] = useState(false);
  const getVideo = async code => {
    fetch(`https://api.vimeo.com/videos/${code}`, {
      method: 'GET',
      headers: {
        Authorization: 'bearer a46bab98f2588bc7b4a6065569895150',
      },
    })
      .then(response => response.json())
      .then(data => {
        const videoUrl =
          data?.files?.find(file => file?.rendition === userInfo.VIDEOQUALITY?.toString() + 'p')
            ?.link ?? data?.files[0].link;
        console.log(data, 'VIDEOURL', userInfo.VIDEOQUALITY);
        setVimeoData(videoUrl);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    if (isVisible) {
      setResult({});
    }
  }, [isVisible]);
  const answers = [
    {
      id: 1,
      text: 'A',
    },
    {
      id: 2,
      text: 'B',
    },
    {
      id: 3,
      text: 'C',
    },
    {
      id: 4,
      text: 'D',
    },
  ];
  return (
    <Modal
      swipeDirection={['down']}
      onSwipeComplete={() => setIsVisible(false)}
      style={{
        margin: 0,
        flex: 1,
        zIndex: 22,
        alignItems: 'center',
        paddingBottom: 40,
        justifyContent: 'center',
      }}
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}>
      <View
        style={{
          width: SIZES.width * 0.95,
          minHeight: SIZES.height * 0.8,
          maxHeight: SIZES.height * 0.8,
          backgroundColor: COLORS.white,
          borderRadius: 8,
          alignItems: 'center',
          paddingTop: 16,
          paddingBottom: 24,
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
            width: SIZES.width * 0.9,
            flexDirection: 'row',
            marginBottom: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: 50,
              flexDirection: 'row',
              height: 3,
              backgroundColor: COLORS.lightGray,
              borderRadius: 3,
            }}
          />
          <TouchableOpacity
            onPress={() => setIsVisible(false)}
            style={{
              position: 'absolute',
              right: 0,
            }}>
            <Icon name={'x'} size={24} type={'feather'} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: SIZES.width * 0.85,
            marginBottom: 20,
            height: 49,
            backgroundColor: '#5667FD',
            borderRadius: 15,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <Text
            onPress={() => setQuestionModalType('question')}
            style={{
              ...BODY3,
              color: COLORS.white,
              width: 100,
              textDecorationLine: questionModalType === 'question' ? 'underline' : 'none',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Soru
          </Text>
          <View
            style={{
              height: 25,
              width: 2,
              backgroundColor: COLORS.white,
            }}
          />
          <Text
            onPress={() => {
              setQuestionModalType('solution');
              getVideo(selectedQuestion?.VIMEO_ID);
            }}
            style={{
              ...BODY3,
              color: COLORS.white,
              textDecorationLine: questionModalType === 'solution' ? 'underline' : 'none',
              width: 100,
              fontSize: 16,
              textAlign: 'center',
            }}>
            Çözüm
          </Text>
        </View>
        {questionModalType === 'question' ? (
          <>
            <View>
              <Image
                style={{
                  width: SIZES.width * 0.875,
                  height: isTablet() ? 400 : SIZES.height * 0.5,
                  borderRadius: 18,
                  backgroundColor: COLORS.white,
                }}
                contentFit={'contain'}
                source={{
                  uri: FILE_URL + selectedQuestion?.PATH + '/' + selectedQuestion?.FILENAME,
                }}
              />
              {/*<Text>{JSON.stringify(selectedQuestion, null, 2)}</Text>*/}
              <FlatList
                numColumns={2}
                data={answers}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      defApiFunc('setUserExamPost', {
                        token,
                        code: selectedQuestion.CODE,
                        values: [{ code: selectedQuestion.CODE, value: item.id }],
                      })
                        .then(res => {
                          console.log(res.data, 'res.datares.data');
                          setResult({
                            ...res.data[0][0],
                            userAnswer: item.id,
                          });
                        })
                        .catch(err => {
                          console.log(err);
                        });
                    }}
                    style={{
                      width: SIZES.width * 0.4,
                      height: 45,
                      margin: 10,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: COLORS.lightBlue,
                      backgroundColor:
                        result.CORRECT === item.id - 1
                          ? COLORS.green
                          : result.ANSWER === item.id
                            ? result.CORRECT
                              ? COLORS.green
                              : COLORS.red
                            : COLORS.lightBlue,

                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        ...BODY4,
                        fontSize: 16,
                        color: COLORS.white,
                      }}>
                      {item.text}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                onPress={() => setImageVisible(true)}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 2.5,
                  backgroundColor: '#fff',
                  borderRadius: 800,
                  padding: 5,
                }}>
                <Icon type={'feather'} name={'zoom-in'} />
              </TouchableOpacity>
            </View>
            {/*<View*/}
            {/*  style={{*/}
            {/*    marginTop: 20,*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <FlatList*/}
            {/*    numColumns={2}*/}
            {/*    data={answers}*/}
            {/*    renderItem={({ item }) => (*/}
            {/*      <TouchableOpacity*/}
            {/*        onPress={() => {*/}
            {/*          setSelectedAnswer(item.text);*/}
            {/*        }}*/}
            {/*        style={{*/}
            {/*          width: SIZES.width * 0.35,*/}
            {/*          height: 37.5,*/}
            {/*          margin: 10,*/}
            {/*          borderRadius: 8,*/}
            {/*          backgroundColor: "#2F80ED",*/}
            {/*          justifyContent: "center",*/}
            {/*          alignItems: "center",*/}
            {/*        }}*/}
            {/*      >*/}
            {/*        <Text*/}
            {/*          style={{*/}
            {/*            ...BODY4,*/}
            {/*            fontSize: 16,*/}
            {/*            color: COLORS.white,*/}
            {/*          }}*/}
            {/*        >*/}
            {/*          {item.text}*/}
            {/*        </Text>*/}
            {/*      </TouchableOpacity>*/}
            {/*    )}*/}
            {/*  />*/}
            {/*</View>*/}
          </>
        ) : (
          <Video
            onFullscreenUpdate={onFullscreenUpdate}
            ref={innerRef}
            onLoadStart={() => {
              setIsVideoLoading(true);
              console.log('onLoadStart');
            }}
            onLoad={() => {
              setIsVideoLoading(false);
              console.log('onLoad');
            }}
            style={{
              width: SIZES.width * 0.875,
              height: isTablet() ? 400 : SIZES.height * 0.325,
              borderRadius: 18,
            }}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls={true}
            source={{
              uri: vimeoData,
            }}
          />
        )}
        {questionModalType === 'solution' && isVideoLoading && (
          <View
            style={{
              position: 'absolute',
              top: SIZES.height * 0.125,
              width: SIZES.width * 0.875,
              height: isTablet() ? 400 : SIZES.height * 0.325,
              borderRadius: 18,
              backgroundColor: 'rgba(0,0,0,0.7)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator />
          </View>
        )}
        <ImageView
          swipeToCloseEnabled={true}
          images={images}
          imageIndex={0}
          visible={imageVisible}
          onRequestClose={() => setImageVisible(false)}
        />
      </View>
    </Modal>
  );
};

export default QuestionModal;
