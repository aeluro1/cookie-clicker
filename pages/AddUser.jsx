import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { addUser, db } from "../firebaseConfig";
import { useState } from "react";

const styles = StyleSheet.create({
  input: {
    width: "80%"
  }
});

export default function AddUser({ navigation }) {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const addUserHandler = () => {
    if (!name) {
      setMsg("Name required");
      return;
    }
    addUser(db, { name: name});
    setName("");
    setMsg("");
    navigation.goBack();
  };

  return (
    <View>
      <Text>Add User</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
      />
      <Button
        title="Add user"
        onPress={addUserHandler}
      />
      {msg && <Text>{msg}</Text>}
    </View>
  );
}