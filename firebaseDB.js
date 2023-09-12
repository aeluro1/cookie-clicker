import { addDoc, collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";
import { auth } from "./firebaseAuth";

const db = getFirestore(app);

async function getUsers() {
  const cookiesSnapshot = await getDocs(collection(db, "cookies"));
  const cookiesList = cookiesSnapshot.docs.map(doc => doc.data());
  return cookiesList;
}

async function getUserCookies() {
  const uid = auth.currentUser.uid;
  const docRef = doc(db, "cookies", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().numCookie;
  } else {
    return 0;
  }
}

async function setCookie(numCookie) {
  try {
    const uid = auth.currentUser.uid;
    const docRef = doc(db, "cookies", uid);
    await setDoc(docRef, { email: auth.currentUser.email, numCookie: numCookie });
    console.log(`Cookie set for user: ${docRef.id}`);
  } catch (e) {
    console.error(`Error adding cookie: ${e}`);
  }
}

async function postFeedback(feedback) {
  try {
    const docRef = await addDoc(collection(db, "feedback"), { feedback });
    console.log(`Feedback submitted w/ ID: ${docRef.id}`);
  } catch (e) {
    console.error(`Error submitting feedback: ${e}`);
  }
}

export { setCookie, getUserCookies, getUsers, postFeedback, db };