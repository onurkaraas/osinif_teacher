import React from "react";
import Routes from "./Routes";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "./AuthContext";

const Providers = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </SafeAreaView>
  );
};

export default Providers;
