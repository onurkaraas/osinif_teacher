import CryptoJS from "crypto-js";

const key = "b14ca5898a4e4133bbce2ea2315a1916";
function decryptString(cipherText) {
  // Convert the key to a WordArray
  const keyWordArray = CryptoJS.enc.Utf8.parse(key);

  // Decrypt the cipherText using AES
  const decrypted = CryptoJS.AES.decrypt(cipherText, keyWordArray, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: CryptoJS.enc.Hex.parse("00000000000000000000000000000000"), // The IV is all zeros in your C# code
  });

  // Convert the decrypted cipher text to a Utf8 string
  const decryptedUtf8 = decrypted.toString(CryptoJS.enc.Utf8);

  return decryptedUtf8;
}
export default decryptString;
