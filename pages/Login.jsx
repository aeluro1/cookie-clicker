import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../firebaseAuth";
import Button from "../components/Button";
import TextField from "../components/TextField";

const provider = new GoogleAuthProvider();

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    gap: 50
  },
  inputContainer: {
    width: "80%",
    gap: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  btnContainer: {
    width: "60%",
    gap: 10
  }
});

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });
    return unsub;
  }, []);

  const signUpHandler = () => {
    createUserWithEmailAndPassword(auth, email, pass)
      .then((creds) => {
        const user = creds.user;
        console.log(`Registered: ${user.email}`);
        setErr(false);
      })
      .catch((err) => {
        setErr(true);
        console.error(err.message);
      });
  };
  const loginHandler = () => {
    signInWithEmailAndPassword(auth, email, pass)
      .then((creds) => {
        const user = creds.user;
        console.log(`Logged in: ${user.email}`);
        setErr(false);
      })
      .catch((err) => {
        setErr(true);
        console.error(err.message);
      });
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.inputContainer}>
        <TextField
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextField
          placeholder="Password"
          value={pass}
          onChangeText={setPass}
          secureTextEntry
        />
        {err && <Text style={{ color: "red" }}>Invalid email or password</Text>}
      </View>
      <View style={styles.btnContainer}>
        <Button title="Login" onPress={loginHandler}/>
        <Button title="Register" onPress={signUpHandler} />
      </View>
    </KeyboardAvoidingView>
  );
}