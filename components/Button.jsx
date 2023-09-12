import { StyleSheet, Text, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "cornflowerblue",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center"
  },
  btnText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16
  }
});

export default function Button(props) {
  return (
    <TouchableOpacity
      {...props}
      style={[styles.btn, props.style]}
    >
      <Text style={styles.btnText}>{props.title}</Text>
  </TouchableOpacity>
  );
}