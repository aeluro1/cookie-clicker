import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { setCookie, getUserCookies, getUsers, db } from "../firebaseDB";
import cookie from "../assets/cookie.png";
import { auth } from "../firebaseAuth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Button from "../components/Button";
import { collection, onSnapshot } from "firebase/firestore";

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
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  scrollViewInner: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  boardCol: {
    flex: 1
  },
  text: {
    fontSize: 20,
    overflow: "hidden"
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
      setCookie(count + 1);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getUsers();
      const sortedUsers = allUsers.sort((a, b) => b.numCookie - a.numCookie);
      setUsers(sortedUsers);
    };
    fetchUsers().catch((error) => console.error(error));

    const loadCount = async() => {
      setCount(await getUserCookies());
    };

    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        loadCount();
      }
      setUser(user);
    });

    const unsubSnap = onSnapshot(collection(db, "cookies"), () => {
      fetchUsers().catch((error) => console.error(error));
    });

    const clean = () => {
      unsub();
      unsubSnap();
    };

    return clean;
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
          {!auth.currentUser ? (
            <Button
              title="Login"
              onPress={() => navigation.navigate("Login")}
              style={styles.btn}
            />
          ) : (
            <Button
              title="Logout"
              onPress={() => signOut(auth).then(() => {setCount(0) && console.log(`Logged out: ${user.email}`)}).catch((err) => {console.error(err.msg)})}
              style={styles.btn}
            />
          )}
          <Button
            title="Submit Feedback"
            onPress={() => navigation.navigate("Feedback")}
            style={styles.btn}
          />
          <ScrollView style={styles.scrollView}>
            <View style={styles.scrollViewInner}>
              <View style={styles.boardCol}>
                {users && users.map((user) => <Text style={styles.text} key={user.email}>{user.email}</Text>)}
              </View>
              <View style={{ alignItems: "flex-end" }}>
                {users && users.map((user) => <Text style={styles.text} key={user.email}>{user.numCookie}</Text>)}
              </View>
            </View>
          </ScrollView>
          <StatusBar style="auto" />
        </View>
      </View>
  );
}