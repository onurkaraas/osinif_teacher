import React, { useContext } from "react";
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TouchableOpacity, View } from "react-native";
import { Icon } from "@rneui/base";
import { Image } from "expo-image";

import { COLORS, FONTS, SIZES } from "../constants/theme";
import Tabs from "./tabs";
import { isAndroid } from "../helpers/check";
import CustomDrawer from "../components/drawer/customDrawer";
import { AuthContext } from "../context/AuthContext";
import {
  CreateTestScreen,
  ExamResultScreen,
  WordGameScreen,
  ExamScreen,
  FastReadGameScreen,
  // DrawerStack
  AvatarScreen,
  ContactUsScreen,
  FAQScreen,
  GoalsScreen,
  LegalInfoScreen,
  ProfileScreen,
  SettingsScreen,
} from "../screens";
import { AllExamsScreen } from "../screens/MainStack";

const DrawerNavigator = () => {
  const { user, signOut } = useContext(AuthContext);
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawer signOut={signOut} user={user} {...props} />
      )}
      useLegacyImplementation={false}
      screenOptions={{
        headerShown: true,
        headerTitleStyle: {
          ...FONTS.H2,
          color: COLORS.white,
          height: SIZES.height * 0.05,
          top: isAndroid ? -12 : -SIZES.height * 0.0175,
          textAlign: "center",
          alignSelf: "center",
        },
        headerLeftContainerStyle: {
          height: 20,
          top: isAndroid ? -SIZES.height * 0.03 : -SIZES.height * 0.2,
        },
        headerTintColor: COLORS.white,
        headerStyle: {
          height: SIZES.height * 0.07,
          backgroundColor: COLORS.primary, //Set Header color
        },
        header: ({ navigation, route }) => (
          <View
            style={{
              width: "100%",
              height: 60,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: COLORS.primaryDark,
            }}
          >
            <TouchableOpacity
              style={{
                zIndex: 1,
                marginLeft: 10,
              }}
              onPress={() => {
                if (route.name === "Tabs") {
                  navigation.openDrawer();
                } else {
                  navigation.goBack();
                }
              }}
            >
              <Icon
                size={24}
                type={"feather"}
                name={route.name === "Tabs" ? "menu" : "chevron-left"}
                color={"white"}
              />
            </TouchableOpacity>
            <View
              style={{
                width: "100%",
                alignSelf: "center",
                position: "absolute",
                alignItems: "center",
              }}
            >
              <Image
                contentFit={"contain"}
                source={require("../../assets/images/logoW.png")}
                style={{
                  width: 100,
                  height: 35,
                }}
              />
            </View>
            <View />
            {/*<Icon*/}
            {/*  type={"ionicon"}*/}
            {/*  name="notifications-outline"*/}
            {/*  size={26}*/}
            {/*  color="white"*/}
            {/*/>*/}
          </View>
        ),
      }}
    >
      <Drawer.Screen name="Tabs" component={Tabs} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="FAQ" component={FAQScreen} />
      <Drawer.Screen name="ContactUs" component={ContactUsScreen} />
      <Drawer.Screen name="LegalInfo" component={LegalInfoScreen} />
      <Drawer.Screen name="Goals" component={GoalsScreen} />
      <Drawer.Screen name="WordGame" component={WordGameScreen} />
      <Drawer.Screen name="Avatar" component={AvatarScreen} />
      <Drawer.Screen name="Exam" component={ExamScreen} />
      <Drawer.Screen name="ExamResult" component={ExamResultScreen} />
      <Drawer.Screen name="CreateTest" component={CreateTestScreen} />
      <Drawer.Screen name="FastReadGame" component={FastReadGameScreen} />
      <Drawer.Screen name="AllExams" component={AllExamsScreen} />

      {/*<Drawer.Screen name="EditProfileScreen" component={EditProfileScreen} />*/}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
