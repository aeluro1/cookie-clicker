import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { db, getUsers } from "../firebaseDB";
import cookie from "../assets/cookie.png";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { auth, login } from "../firebaseAuth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Button from "../components/Button";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "start"
  },
  infoContainer: {
    // flex: 1,
    alignItems: "center",
    width: "100%",
    padding: 30,
    backgroundColor: "red"
  },
  cookieContainer: {
    // flex: 1,
    width: "100%",
    backgroundColor: "green"
  },
  dataContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "yellow",
    justifyContent: "start",
    alignItems: "center",
    gap: 10,
    paddingTop: 20
  },
  btn: {
    width: "80%"
  },
  cookie: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 0.9,
    backgroundColor: "green",
    objectFit: "contain"
  },
  title: {
    fontSize: 50,
    fontWeight: "bold"
  }
});

export default function Home({ navigation }) {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setUsers(await getUsers(db));
    };
    fetchUsers().catch((error) => console.error(error));
;
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return unsub;
  }, []);

  return (
    <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Score: {count}</Text>
        </View>
        <TouchableHighlight onPress={() => setCount(count + 1)}>
          <Image
            source={cookie}
            style={styles.cookie}
            resizeMode="contain"
            onPress={() => setCount(count + 1)}
          />
        </TouchableHighlight>
        <View style={styles.dataContainer}>
          {!user ? (
            <Button
              title="Login"
              onPress={() => navigation.navigate("Login")}
              style={styles.btn}
            />
          ) : (
            <Button
              title="Logout"
              onPress={() => signOut(auth).then(() => {console.log(`Logged out: ${user.email}`)}).catch((err) => {console.error(err.msg)})}
              style={styles.btn}
            />
          )}
          <Button
            title="Submit Feedback"
            onPress={() => navigation.navigate("Feedback")}
            style={styles.btn}
          />
          {users && users.map((user) => <Text>{user.name}</Text>)}
          <StatusBar style="auto" />
        </View>
      </View>
  );
}