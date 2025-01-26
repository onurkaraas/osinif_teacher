import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../../screens/MainStack";
const Stack = createStackNavigator();
const mainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={"HomeScreen"} component={HomeScreen} />
      <Stack.Group
        screenOptions={{
          headerShown: false,
          presentation: "modal",
        }}
      >
        {/*<Stack.Screen name={"EditProfileModal"} component={EditProfileScreen} />*/}
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default mainStack;
