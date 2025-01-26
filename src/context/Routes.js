import "react-native-gesture-handler";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { signStack } from "./stacks";
//api
import { enableScreens } from "react-native-screens";
import Splash from "../screens/SignStack/Splash";
import { AuthContext } from "./AuthContext";
import DrawerNavigator from "../navigation/drawer";
import getUser from "../api/user/getUser";
import getUserInfo from "../helpers/getUserInfo";
import { defApiFunc } from "../api";

const NStack = createStackNavigator();

const Routes = () => {
  enableScreens();

  const {
    user,
    token,
    setUser,
    signIn,
    loading,
    setLoading,
    setUserInfo,
    isProfileUpdated,
    setIsProfileUpdated,
  } = useContext(AuthContext);
  useEffect(() => {
    getUserInfo().then((user) => {
      if (user) {
        console.log("user", user);
        if (user.username && user.password) {
          signIn({
            username: user.username,
            password: user.password,
          });
        } else {
          console.log("NOT LOGIN");
          setLoading(false);
        }
      } else {
        console.log("NOT LOGIN");
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    if (token) {
      getUser({
        token: token,
      }).then((response) => {
        if (response) {
          setUser(response[0]);

          // console.log("response", response);
          if (response[0].USERID) {
            defApiFunc("getAccountProfile", {
              userid: response[0].USERID,
            }).then(
              (res) => {
                console.log("USERID", res.data);
                setUserInfo(res?.data[0]);
              },
              (err) => {
                console.log("err", err);
              },
            );
          }
          // setUser(response[0]);
        }
        console.log("LOADINFALSE_ROUTES64");
        setLoading(false);
      });
    } else {
      console.log("LOADINFALSE_ROUTES68");
    }
  }, [token]);

  useEffect(() => {
    if (isProfileUpdated) {
      defApiFunc("getAccountProfile", {
        userid: user?.USERID,
      })
        .then(
          (res) => {
            console.log("USERID", res.data);
            setUserInfo(res?.data[0]);
          },
          (err) => {
            console.log("err", err);
          },
        )
        .finally(() => {
          setIsProfileUpdated(false);
        });
    }
  }, [isProfileUpdated]);

  if (loading) {
    return <Splash />;
  }
  return (
    <NavigationContainer>
      {!user ? (
        signStack()
      ) : (
        <NStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <NStack.Screen name={"DrawerNavigator"} component={DrawerNavigator} />
        </NStack.Navigator>
      )}
    </NavigationContainer>
  );
};
export default Routes;
