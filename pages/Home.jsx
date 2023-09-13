import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { setCookie, getUserCookies, getUsers, db } from "../firebaseDB";
import cookie from "../assets/chocoCookie.png";
import { auth } from "../firebaseAuth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Button from "../components/Button";
import { collection, onSnapshot } from "firebase/firestore";
import TextTicker from "react-native-text-ticker";
import axios from "axios";

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
  scrollViewContainer: {
    width: "80%",
    height: "100%",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  scrollView: {

  },
  boardRow: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  text: {
    fontSize: 20,
    overflow: "hidden"
  },
  header: {
    backgroundColor: "white",
    fontWeight: "bold"
  },
  activeUser: {
    fontStyle: "italic",
    color: "limegreen"
  },
  rank: {
    fontWeight: "bold",
    width: 30
  },
  quote: {
    fontSize: 20,
    paddingHorizontal: 20
  }
});

export default function Home({ navigation }) {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [quote, setQuote] = useState("Cookies are delicious!")
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

    axios.get("https://api.api-ninjas.com/v1/quotes?category=inspirational", {
      headers: {
        "X-Api-Key": "y2skG0Esh6dtsOZUSax8cA==Dm6ipEI64lJzrVMw"
      }
    })
      .then((res) => {
        const quote = res.data[0];
        setQuote(`${quote.author} - ${quote.quote}`);
      })
      .catch((err) => console.error(err));

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
      <TextTicker
        style={styles.quote}
        scroll
        scrollSpeed={30}
        loop
        repeatSpacer={0}
      >{quote}</TextTicker>
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
        <View style={styles.scrollViewContainer}>
          <ScrollView style={styles.scrollView} stickyHeaderIndices={[0]}>
            <View>
              <Text style={[styles.text, styles.header]}>Leaderboard</Text>
            </View>
            {users && users.map((u, idx) => (
              <View key={u.email} style={styles.boardRow}>
                <Text style={[styles.text, styles.rank, user?.email === u.email && styles.activeUser]}>{idx + 1}</Text>
                <Text style={[styles.text, { flex: 1 }, user?.email === u.email && styles.activeUser]}>{u.email}</Text>
                <Text style={[styles.text, user?.email === u.email && styles.activeUser]}>{u.numCookie}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}