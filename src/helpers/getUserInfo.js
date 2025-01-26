import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserInfo = async () => {
  try {
    const user = await AsyncStorage.getItem("user");
    if (user !== null) {
      return JSON.parse(user);
    }
  } catch (e) {
    console.log(e);
  }
};

export default getUserInfo;
