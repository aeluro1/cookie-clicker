// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";

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
  apiKey: "AIzaSyAjnPvhsTYYm9QTzVPfqK7pVl7PQs5aTmY",
  authDomain: "firstproject-94641.firebaseapp.com",
  projectId: "firstproject-94641",
  storageBucket: "firstproject-94641.appspot.com",
  messagingSenderId: "371514646274",
  appId: "1:371514646274:web:4eb9366d6d9b31af8b6c1b",
  measurementId: "G-JVW56SVD5W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

async function getUsers(db) {
  const usersCol = collection(db, "users");
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map(doc => doc.data());
  return userList;
}

async function addUser(db, user) {
  try {
    const docRef = await addDoc(collection(db, "users"), user);
    console.log(`Document added w/ ID: ${docRef.id}`);
  } catch (e) {
    console.error(`Error adding document: ${e}`);
  }
}

export { db, getUsers, addUser };