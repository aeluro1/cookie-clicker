import { GoogleAuthProvider, getAuth, getRedirectResult, signInWithPopup, signInWithRedirect } from "firebase/auth";

const provider = new GoogleAuthProvider();
const auth = getAuth();
auth.useDeviceLanguage();
provider.setCustomParameters({
  "login_hint": "name@gmail.com"
});

function login() {
  signInWithRedirect(auth, provider);

  getRedirectResult(auth)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
  }).catch((error) => {
    console.error({ error, auth: GoogleAuthProvider.credentialFromError(error) });
  });
}

export { auth };