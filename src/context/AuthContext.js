import React, { createContext, useEffect, useState } from "react";
import instance, { defApiFunc } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import encryptString from "../helpers/encryptString";
import * as Network from "expo-network";
export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState(null);
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  useEffect(() => {
    if (token) {
      instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userInfo,
        setUserInfo,
        token,
        setToken,
        loading,
        setLoading,
        isProfileUpdated,
        setIsProfileUpdated,
        signUp: async (props) => {
          console.log("props", props);
          defApiFunc("setMemberRegister", {
            ...props,
            password: encryptString(props.password),
          }).then((response) => {
            console.log("response", response);
            if (response.data[0].STYLE === "success") {
              Alert.alert("Success", "You have successfully signed up");
            } else {
              Alert.alert("Hata", `${response.data[0].MESSAGE}`);
            }
          });
          // .catch((error) => {
          //   setLoading(false);
          //   Alert.alert("Hata", "Error while signing in, please try again");
          //   console.log("error", error);
          // });
        },
        signIn: async ({ username, password, setPageLoading }) => {
          console.log("username", username, encryptString(password));
          const ip = await Network.getIpAddressAsync();
          const response = await instance
            .post(``, {
              Command: "getToken",
              Data: {
                user: username,
                pass: encryptString(password),
                ip: ip,
              },
            })
            .then((response) => {
              console.log("response", response?.data);

              if (response.data[0].STYLE === "success") {
                setPageLoading ? setPageLoading(false) : null;
                setToken(response?.data[0]?.DATA);
                AsyncStorage.setItem(
                  "user",
                  JSON.stringify({
                    username: username,
                    password: password,
                  }),
                );
              } else {
                setPageLoading(false);
                Alert.alert("Hata", `${response.data[0].MESSAGE}`);
              }
              console.log("response.data", response.data[0].DATA);
            })
            .catch((error) => {
              setPageLoading ? setPageLoading(false) : null;
              setLoading(false);
              console.log("LCONTEXT_79");
              Alert.alert(
                "Hata",
                "Giriş yapılırken hata oluştu, lütfen tekrar deneyin",
              );
              console.log("error", error.response.data);
            });
        },
        updateProfile: async (props) => {
          const { values } = props;
          defApiFunc("setMemberUpdate", {
            firstnameInput: values.name ?? userInfo.NAME,
            lastnameInput: "",
            DateBirth: "24.01.2024",
            cboCity: 45,
            cboKurum: 0,
            cboOkul: 0,
            cboSinif: 0,
            cboSube: 0,
            cboQuality: 540,
            smsNotification: 1,
            emailNotification: 0,
            saveType: 2,
            familyname: "",
            familyphone: "",
            avatar: "/assets/img/avatars/avatar_latin_guy.png",
            userid: userInfo.ID,
            questionInput: parseInt(values.question),
            paragraphInput: parseInt(values.paragraph),
            videoInput: parseInt(values.video),
          }).then((s) => {
            console.log(s, "s");
          });
        },

        signOut: () => {
          try {
            setUser(null);
            AsyncStorage.removeItem("user");
          } catch (error) {
            return error;
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
