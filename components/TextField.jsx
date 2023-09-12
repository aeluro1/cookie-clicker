import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  input: {
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10
  }
});

export default function TextField(props) {
  return (
    <TextInput
      {...props}
      style={[styles.input, props.style]}
    />
  );
}