import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Home from "./src/screens/Home";
import Expenses from "./src/screens/Expenses";
import Incomes from "./src/screens/Incomes";
import colors from "./src/design-system/colors";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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

        {/* <Tab.Screen
          name="Perfil"
          component={Perfil}
          options={{
            tabBarLabel: "Meu Perfil",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="user" color={color} size={size} />
            ),
          }}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
