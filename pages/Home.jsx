import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { db, getUsers } from "../firebaseConfig";
import cookie from "../assets/cookie.png";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    gap: "10em"
  },
});

export default function Home({ navigation }) {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setUsers(await getUsers(db));
    };
    fetchUsers().catch((error) => console.error(error));
  });

  return (
    <View style={styles.container}>
        <Text>{count}</Text>
        <Button
          title="Click me"
          onPress={() => setCount(count + 1)}
          accessibilityLabel="Click me"
        />
        <Image
          source={cookie}
        />
        <Button
          title="Add User"
          onPress={() => navigation.navigate('AddUser')}
        />
        {users && users.map((user) => <Text>{user.name}</Text>)}
        <StatusBar style="auto" />
      </View>
  );
}