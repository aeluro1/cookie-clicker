import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "./firebaseConfig";

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