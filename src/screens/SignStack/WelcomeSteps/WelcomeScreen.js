import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { black, BODY3, COLORS, H_BOLD, SHADOWS, SIZES } from '../../../constants/theme';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Image } from 'expo-image';
import { isAndroid } from '../../../helpers/check';
import { isTablet } from '../../../helpers/deviceInfo';
import { defApiFunc, FILE_URL } from '../../../api';
import { useEffect } from 'react';
import { REF_FILE_URL } from '../../../api';
import WebView from 'react-native-webview';
const WelcomeScreen = () => {
  let navigation = useNavigation();
  const [slides, setSlides] = React.useState([]);
  const [page, setPage] = React.useState(0);
  useEffect(() => {
    defApiFunc('getPageUrl', {
      url: 'osinif___splash_1',
      userid: 7,
    }).then(res => {
      console.log(res.data[1]);
      setSlides(res.data[1]);
    });
  }, []);

  // let slides = [
  //     {
  //         image: require('../../../../assets/images/tuto_1.png'),
  //         text: 'OSINIF; 5, 6 ve 7. sınıf, 9, 10 ve 11. sınıf, TYT, AYT, LGS, KPSS, DGS, ALES, MSÜ, YDS, YÖKDİL, IELTS, TOEFL gibi akademik ve sınav süreci odaklı eğitim gibi pek çok konspette içerik barındırmaktadır.',
  //         title: 'Eğitim artık çok kolay',
  //         step: 1,
  //     },
  //     {
  //         image: require('../../../../assets/images/tuto_2.png'),
  //         title: 'OSINIF',
  //         text: 'İlerlemeye uyum sağlayın ve teknolojinin eğitim sektöründeki değişimlere ayak uydurun.',
  //     },
  //     {
  //         image: require('../../../../assets/images/tuto_3.png'),
  //         text: 'Sanal gerçeklik ile keşfedin ve  dijital ortamlarda öğrenme deneyimini yaşayın.',
  //         title: 'OSINIF',
  //     },
  // ];
  return (
    <View
      style={{
        flex: 1,
      }}>
      <AppIntroSlider
        style={{
          flex: 1,
          flexDirection: 'row',
        }}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: COLORS.primary,
        }}
        nextLabel={'Atla'}
        type={'fullscreen'}
        data={slides}
        onDone={() => {
          navigation.navigate('WelcomeScreen');
        }}
        renderPrevButton={() => {
          return (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.white,
                backfaceVisibility: 'hidden',
                borderRadius: 12,
              }}>
              <Text
                style={{
                  ...H_BOLD,
                  paddingHorizontal: 16,
                  paddingVertical: 4,
                  fontSize: 20,
                }}>
                Geri
              </Text>
            </View>
          );
        }}
        renderNextButton={() => {
          return (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.white,
                backfaceVisibility: 'hidden',
                borderRadius: 12,
              }}>
              <Text
                style={{
                  ...H_BOLD,
                  paddingHorizontal: 16,
                  paddingVertical: 4,
                  fontSize: 20,
                }}>
                İleri
              </Text>
            </View>
          );
        }}
        renderDoneButton={() => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('SignInScreen')}
              style={{
                ...SHADOWS.shadowOne,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.white,
                backfaceVisibility: 'hidden',
                borderRadius: 12,
              }}>
              <Text
                style={{
                  ...H_BOLD,
                  paddingVertical: 4,
                  paddingHorizontal: 16,
                  fontSize: 20,
                }}>
                Bitir
              </Text>
            </TouchableOpacity>
          );
        }}
        onSlideChange={index => {
          setPage(index);
        }}
        showSkipButton={true}
        renderSkipButton={() => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('SignInScreen')}
              style={{
                ...SHADOWS.shadowOne,
                alignItems: 'center',
                position: 'absolute',
                justifyContent: 'center',
                backgroundColor: COLORS.primaryDark,
                zIndex: 999,
                left: isTablet() ? SIZES.width * 0.875 : SIZES.width * 0.75,
                bottom: isTablet()
                  ? SIZES.height * 0.85
                  : isAndroid()
                    ? SIZES.height * 0.85
                    : SIZES.height * 0.75,
                backfaceVisibility: 'hidden',
                borderRadius: 12,
              }}>
              <Text
                style={{
                  ...H_BOLD,
                  paddingHorizontal: 16,
                  paddingVertical: 4,
                  fontSize: 20,
                  color: COLORS.white,
                }}>
                Geç
              </Text>
            </TouchableOpacity>
          );
        }}
        showNextButton={true}
        showPrevButton={true}
        activeDotStyle={{
          backgroundColor: COLORS.primaryDark,
          width: 75,
          bottom: SIZES.height * 0.05,
          height: 28,
          borderRadius: 15,
        }}
        dotStyle={{
          height: 28,
          width: 28,
          bottom: SIZES.height * 0.05,
          borderRadius: 16,
          backgroundColor: COLORS.lightGrayOne,
        }}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                flex: 1,
                width: SIZES.width,
                alignItems: 'center',
                backgroundColor: COLORS.primary,
                paddingBottom: SIZES.height * 0.15,
              }}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    marginTop: SIZES.height * 0.125,
                    width: SIZES.width,
                    height: SIZES.height * 0.3,
                  }}
                  contentFit={'contain'}
                  source={FILE_URL + 'pages' + '/' + item.FILENAME}
                />
              </View>

              <View
                style={{
                  marginTop: 50,
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <Text
                  style={{
                    ...H_BOLD,
                    fontSize: 28,
                    textAlign: 'center',
                    marginBottom: SIZES.height * 0.02,
                  }}>
                  {item.title}
                </Text>
                <WebView
                  originWhitelist={['*']}
                  source={{
                    html:
                      `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width" initial-scale="1.00" maximum-scale="1.0"></head>
                                            <style>body { font-size: 100%; word-wrap: break-word; overflow-wrap: break-word; text-align: center; }</style>` +
                      `<body style="font-family: Verdana; color: ${black}"> 
                                            ${item.DESCRIPTION || ''}
                                            </body></html>`,
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    width: SIZES.width * 0.8,
                    height: SIZES.height * 0.2,
                  }}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};
export default WelcomeScreen;
