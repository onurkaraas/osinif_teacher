import React from "react";
import WelcomeScreen from "../../screens/SignStack/WelcomeSteps/WelcomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { SignUpScreen, SignInScreen } from "../../screens/SignStack";
const NStack = createStackNavigator();
const signStack = () => {
  return (
    <NStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/*<NStack.Screen name={"IntroScreen"} component={WelcomeScreen} />*/}
      <NStack.Screen name={"WelcomeScreen"} component={WelcomeScreen} />
      <NStack.Screen name={"SignUpScreen"} component={SignUpScreen} />
      <NStack.Screen name={"SignInScreen"} component={SignInScreen} />
    </NStack.Navigator>
  );
};

export default signStack;
