import { StyleSheet, Text, TextInput, View } from "react-native";
import { postFeedback, db } from "../firebaseDB";
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
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const submitHandler = () => {
    if (!name) {
      setMsg("Content required");
      return;
    }
    postFeedback(db, { name: name});
    setName("");
    setMsg("");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextField
        onChangeText={setName}
        value={name}
        style={styles.input}
        multiline
      />
      <Button
        title="Submit"
        handler={submitHandler}
        style={styles.btn}
      />
      {msg && <Text>{msg}</Text>}
    </View>
  );
}