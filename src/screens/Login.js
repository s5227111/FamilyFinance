import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import colors from "../design-system/colors";
import { handleLogin } from "../services/userService";
import { setUser } from "../storage/userStorage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigation = useNavigation();

  const handleLoginUser = async () => {
    setLoading(true);
    try {
      const response = await handleLogin(email, password);

      if (response) {
        await setUser(response);
        navigation.navigate("Home");
      }

      setError("Credentials are not valid");
    } catch (e) {
      setError(e.message);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Family Finance</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={handleLoginUser}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Pressable
        style={{ marginBottom: 10 }}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={{ color: colors.primary }}>
          Don't have a registration? sign up for free
        </Text>
      </Pressable>

      {loading && <Text>Loading...</Text>}
      {error && <Text style={{ color: colors.danger }}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: 300,
    paddingHorizontal: 8,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
    backgroundColor: colors.primary,
    color: colors.white,
    width: 200,
    padding: 8,
  },

  buttonText: {
    color: colors.white,
    textAlign: "center",
  },
});

export default Login;
