import instance from "../index";
import { Alert } from "react-native";
import * as Network from "expo-network";

const getUser = async ({ token }) => {
  const ip = await Network.getIpAddressAsync();
  const response = await instance.post(``, {
    Command: "getMember",
    Data: {
      token: token,
      ip: ip,
    },
  });
  if (response.data) {
    console.log("response", response.data);
    return response.data;
  } else {
    Alert.alert("Error", `${response.data.message}`);
  }
};

export default getUser;
