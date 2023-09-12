import { StyleSheet, Text, TextInput, View } from "react-native";
import { postFeedback } from "../firebaseDB";
import { useState } from "react";
import Button from "../components/Button";
import TextField from "../components/TextField";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "center",
    marginTop: 30,
    gap: 20
  },
  input: {
    width: "80%",
    height: 200,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  btn: {
    width: "60%"
  }
});

export default function Feedback({ navigation }) {
  const [fb, setFb] = useState("");
  const [msg, setMsg] = useState("");

  const submitHandler = () => {
    if (!fb) {
      setMsg("Content required");
      return;
    }
    postFeedback(fb);
    setFb("");
    setMsg("");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextField
        onChangeText={setFb}
        value={fb}
        style={styles.input}
        multiline
      />
      <Button
        title="Submit"
        onPress={submitHandler}
        style={styles.btn}
      />
      {msg && <Text>{msg}</Text>}
    </View>
  );
}