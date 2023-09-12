import { GoogleAuthProvider, getAuth, getRedirectResult, signInWithPopup, signInWithRedirect } from "firebase/auth";

const provider = new GoogleAuthProvider();
const auth = getAuth();
auth.useDeviceLanguage();
provider.setCustomParameters({
  "login_hint": "name@gmail.com"
});

export { auth };