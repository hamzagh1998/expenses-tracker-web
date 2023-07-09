// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqZqhrNu2b77lzli9MJqI5WKmrwkE85ZE",
  authDomain: "expenses-tracker-eb495.firebaseapp.com",
  projectId: "expenses-tracker-eb495",
  storageBucket: "expenses-tracker-eb495.appspot.com",
  messagingSenderId: "1061248508685",
  appId: "1:1061248508685:web:b6c293670ce2ebe95d8644",
  measurementId: "G-5G0BR5Q7VE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);