import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { addCookie, getCookies } from "../firebaseDB";
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
    alignItems: "center",
    justifyContent: "start",
    backgroundColor: "inherit"
  },
  infoContainer: {
    // flex: 1,
    alignItems: "center",
    width: "100%",
    padding: 30,
  },
  cookieContainer: {
    // flex: 1,
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 0.9,
    justifyContent: "center",
    alignItems: "center"
  },
  cookie: {
    objectFit: "contain"
  },
  dataContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "start",
    alignItems: "center",
    gap: 10,
    paddingTop: 20
  },
  btn: {
    width: "80%"
  },
  title: {
    fontSize: 50,
    fontWeight: "bold"
  },
  scrollView: {
    width: "80%",
  }
});

export default function Home({ navigation }) {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [btnSize, setBtnSize] = useState({
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 0.9
  });

  const incCount = () => {
    setCount(count + 1);
    if (auth.currentUser) {
      addCookie();
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setUsers(await getCookies());
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

  const zoomIn = () => {
    setBtnSize({
      width: Dimensions.get("window").width * 0.8,
      height: Dimensions.get("window").width * 0.8
    });
  };
  const zoomOut = () => {
    setBtnSize({
      width: Dimensions.get("window").width * 0.9,
      height: Dimensions.get("window").width * 0.9
    });
  };

  return (
    <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Score: {count}</Text>
        </View>
        <TouchableHighlight
          onPress={incCount}
          onPressIn={zoomIn}
          onPressOut={zoomOut}
          underlayColor="transparent"
          activeOpacity={1}
          style={styles.cookieContainer}
        >
          <Image
            source={cookie}
            style={[styles.cookie, btnSize]}
            resizeMode="contain"
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
          <Text>Leaderboard</Text>
          <ScrollView style={styles.scrollView}>
            {users && users.map((user) => <Text>{user.name}</Text>)}
          </ScrollView>
          <StatusBar style="auto" />
        </View>
      </View>
  );
}