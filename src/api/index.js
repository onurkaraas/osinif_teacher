import axios from "axios";
import { Alert } from "react-native";

const API_URL =
  "https://wssuycshkpm4tu4eajucxzlfcm0neovm.lambda-url.eu-central-1.on.aws/";
const FILE_URL = "https://console.sanalegitim.com.tr/files/";
const REF_FILE_URL = "https://console.sanalegitim.com.tr/files/References/";
const api_key = "";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  accept: "*/*",
});

const defApiFunc = async (method, data) => {
  const response = await instance
    .post("", {
      Command: method,
      Data: data,
    })
    .catch((error) => {
      console.log("error", error, method);
      // Alert.alert("Error", "Error while signing in, please try again");
    });
  if (response) {
    return response;
  } else {
    console.log("response", response);
    // Alert.alert("Error", `${response}`);
  }
};
export default instance;

export { API_URL, api_key, defApiFunc, FILE_URL, REF_FILE_URL };
