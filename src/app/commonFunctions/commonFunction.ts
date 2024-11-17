import CryptoJS from "crypto-js";

const secretKey = "your-very-secure-key"; // Use an environment variable in production

// Encrypt the token
export const encryptToken = (token: any) => {
    if (typeof token !== 'string') {
      token = JSON.stringify(token); // Convert to string if it's an object
    }
    return CryptoJS.AES.encrypt(token, secretKey).toString();
  };

// Decrypt the token
export const decryptToken = (encryptedToken: any) => {
  const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Store token securely
sessionStorage.setItem("authToken", encryptToken("your-token"));

// Retrieve token securely
const encryptedToken = sessionStorage.getItem("authToken");
const token = encryptedToken ? decryptToken(encryptedToken) : null;

console.log(token);
