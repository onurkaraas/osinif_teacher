import CryptoJS from "crypto-js";

const key = "b14ca5898a4e4133bbce2ea2315a1916"; // The same key as in your C# code

function encryptString(plainText) {
  // Convert the key to a WordArray
  const keyWordArray = CryptoJS.enc.Utf8.parse(key);

  // Encrypt the plainText using AES
  const encrypted = CryptoJS.AES.encrypt(plainText, keyWordArray, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: CryptoJS.enc.Hex.parse("00000000000000000000000000000000"), // The IV is all zeros in your C# code
  });

  // Convert the encrypted cipher text to base64
  const encryptedBase64 = encrypted.toString();

  return encryptedBase64;
}

export default encryptString;
// Usage
