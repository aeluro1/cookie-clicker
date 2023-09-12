import { addDoc, collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";
import { auth } from "./firebaseAuth";

const db = getFirestore(app);

async function getCookies() {
  const cookiesSnapshot = await getDocs(collection(db, "cookies"));
  const cookiesList = cookiesSnapshot.docs.map(doc => doc.data());
  return cookiesList;
}

async function addCookie() {
  try {
    const uid = auth.currentUser.uid;
    const docRef = doc(db, "cookies", uid);
    const docSnap = await getDoc(docRef);
    let numCookie = 0;
    if (docSnap.exists()) {
      numCookie = docSnap.data().numCookie;
    }
    await setDoc(docRef, { email: auth.currentUser.email, numCookie: numCookie + 1 });
    console.log(`Cookie added for user: ${docRef.id}`);
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

export { addCookie, getCookies, postFeedback };