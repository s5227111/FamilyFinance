import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

import Home from "./src/screens/Home";
import Expenses from "./src/screens/Expenses";
import Incomes from "./src/screens/Incomes";
import colors from "./src/design-system/colors";
import Login from "./src/screens/Login";
import Profile from "./src/screens/Profile";
import Register from "./src/screens/Register";
import Charts from "./src/screens/Charts";
import { getUserLocal } from "./src/storage/userStorage";
import { useEffect, useState } from "react";
import UserContext from "./src/context/userContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabScreens() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.link,
        tabBarInactiveTintColor: colors.secondary,
        tabBarActiveBackgroundColor: colors.primary,
        tabBarInactiveBackgroundColor: colors.primary,
        tabBarStyle: {
          backgroundColor: colors.primary,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Expenses"
        component={Expenses}
        options={{
          tabBarLabel: "Expenses",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="cash-minus"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Incomes"
        component={Incomes}
        options={{
          tabBarLabel: "Incomes",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="cash-plus"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Charts"
        component={Charts}
        options={{
          tabBarLabel: "Charts",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="linechart" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const user = await getUserLocal();
      setUser(user);
    }

    loadUser();
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            {!user && <Stack.Screen name="Login" component={Login} />}
            <Stack.Screen name="Home" component={TabScreens} />
            <Stack.Screen name="Register" component={Register} />
            {user && <Stack.Screen name="Login" component={Login} />}
          </Stack.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
