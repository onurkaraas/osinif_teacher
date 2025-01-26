import React from 'react';
import 'react-native-gesture-handler';
import { Platform, useWindowDimensions, View, Text } from 'react-native';
import {
    COLORS,
    FONTS,
    lightGrayThree,
    primary,
    SHADOWS,
    SIZES,
} from '../constants/theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
    HomeScreen,
    ReadScreen,
    GamesScreen,
    EducationScreen,
    CreateTestScreen,
    TestsScreen,
} from '../screens/MainStack';
import { Icon } from '@rneui/base';
const Tab = createBottomTabNavigator();

const Tabs = () => {
    const longScreen = SIZES.height > 750;
    const window = useWindowDimensions();
    const icons = {
        Ana_Sayfa: 'home',
        Kontrol: 'chatbox-ellipses-outline',
        Ödev: 'text-box-check-outline',
        Testler: 'inbox-full-outline',
    };
    let isAndroid = Platform.OS === 'android';
    return (
        <Tab.Navigator
            labeled="false"
            inactiveColor={'#fff'}
            initialRouteName={'Discover'}
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: COLORS.black,
                tabBarInactiveTintColor: 'white',
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    backfaceVisibility: 'hidden',
                    position: 'absolute',
                    height: longScreen ? 80 : SIZES.height * 0.1,
                    width: window.width,
                    paddingTop: longScreen && !isAndroid ? 20 : 0,
                    borderTopColor: 'transparent',
                    borderColor: 'transparent',
                    borderWidth: 0,
                    backgroundColor: COLORS.white,
                    ...SHADOWS.shadowTwo,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    const iconName = icons[route.name];
                    const iconType =
                        icons[route.name] === 'home'
                            ? 'antdesign'
                            : icons[route.name] === 'inbox-full-outline' ||
                                icons[route.name] === 'text-box-check-outline'
                              ? 'material-community'
                              : 'ionicon';
                    return (
                        <View
                            style={{
                                backgroundColor: focused
                                    ? COLORS.primaryDark
                                    : '#fff',
                                width: 50,
                                height: 50,
                                zIndex: 1,
                                borderRadius: 25,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Icon
                                type={iconType}
                                name={iconName}
                                size={24}
                                color={focused ? 'white' : 'black'}
                            />
                            <Text
                                style={{
                                    display: focused ? 'none' : 'flex',
                                    position: 'absolute',
                                    bottom: -12,
                                    width: 80,
                                    textAlign: 'center',
                                    ...FONTS.BODY1,
                                    fontSize: SIZES.body3,
                                }}
                            >
                                {route.name.replace('_', ' ')}
                            </Text>
                        </View>
                    );
                },
            })}
        >
            <Tab.Screen name="Ana_Sayfa" component={HomeScreen} />
            <Tab.Screen name="Ödev" component={EducationScreen} />
            <Tab.Screen name="Testler" component={CreateTestScreen} />
            <Tab.Screen name="Kontrol" component={ReadScreen} />
        </Tab.Navigator>
    );
};

export default Tabs;
