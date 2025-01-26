import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Providers from "./src/context";
import "moment/locale/tr";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BalooPaaji2_400Regular,
  BalooPaaji2_500Medium,
  BalooPaaji2_600SemiBold,
  BalooPaaji2_700Bold,
  BalooPaaji2_800ExtraBold,
} from "@expo-google-fonts/baloo-paaji-2";

import {
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
  Poppins_400Regular_Italic,
} from "@expo-google-fonts/poppins";
import { enableFreeze } from "react-native-screens";

import React, { useEffect } from "react";
import { registerRootComponent } from "expo";
import { COLORS } from "./src/constants/theme";

const App = () => {
  enableFreeze(true);

  const [fontsLoaded] = useFonts({
    BalooPaaji2_400Regular,
    BalooPaaji2_500Medium,
    BalooPaaji2_600SemiBold,
    BalooPaaji2_700Bold,
    BalooPaaji2_800ExtraBold,
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
    Poppins_400Regular_Italic,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Providers />
        <StatusBar backgroundColor={COLORS.primaryDark} style="dark" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
registerRootComponent(App);

export default App;
