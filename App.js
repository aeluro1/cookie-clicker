import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Clicker Counter" }}
        />
        <Stack.Screen
          name="AddUser"
          component={AddUser}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}