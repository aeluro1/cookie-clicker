// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAcL4QdP3VSLayLKK5DDl395wyr2ixkzDY",
  authDomain: "cookieclicker-b44ba.firebaseapp.com",
  projectId: "cookieclicker-b44ba",
  storageBucket: "cookieclicker-b44ba.appspot.com",
  messagingSenderId: "133309531878",
  appId: "1:133309531878:web:2c25a5d4ce468d1ab61d27",
  measurementId: "G-B03KCHE1SL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };