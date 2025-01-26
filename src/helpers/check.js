import { Platform } from "react-native";

export const isNonEmptyString = (str) =>
  Boolean(str && typeof str === "string" && str.length);

export const isInteger = (str) =>
  Boolean(str && typeof str === "string" && str.match(/^\d+$/));

export const isObject = (obj) => Boolean(obj && typeof obj === "object");

export const isArray = (obj) => Boolean(isObject(obj) && obj instanceof Array);

export const isNonEmptyArray = (obj) => Boolean(isArray(obj) && obj.length > 0);
export const orderArrayByID = (array) => {
  return array.sort((a, b) => {
    return a.id - b.id;
  });
};
export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export function isValidPassword(password) {
  // Check if password is at least 8 characters long
  if (password.length < 8) {
    return false;
  }

  // Check if password includes at least one number and one letter
  const hasNumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);

  return hasNumber && hasLetter;
}
export const isAndroid = () => Platform.OS === "android";
export const checkIsMailValid = (email) => {
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
