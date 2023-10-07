// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
require('dotenv').config()

const firebaseConfig = {
  apiKey: process.env.APIKEY ||"AIzaSyBxrYpE7CcUCQQwvCTkYgiGgbAjsQUpd-w",
  authDomain: process.env.AUTHDOMAIN || "applause-ce1e3.firebaseapp.com",
  projectId: process.env.PROJECTID || "applause-ce1e3",
  storageBucket: process.env.STORAGEBUCKET ||"applause-ce1e3.appspot.com",
  messagingSenderId: process.env.MESSAGINGSENDERID ||"375036842231",
  appId: process.env.APPID || "1:375036842231:web:0ed537b823a11f0b4a43f2",
  measurementId: process.env.MEASUREMENTID || "G-4MWCWZMY41"
};

console.log(process.env)
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('fuzzybunnies'),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true
});
export const storage = getStorage(app)
export const auth=getAuth(app)
