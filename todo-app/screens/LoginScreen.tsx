import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const submitHandler = () => {};

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        placeholderTextColor="grey"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="grey"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Pressable onPress={submitHandler} style={styles.primaryButton}>
        <Text style={styles.primaryBtnText}>Login</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("SignUpScreen")} style={styles.secondaryButton}>
        <Text style={styles.secondaryBtnText}>
          Don't have an account? Sign Up
        </Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    color: "white",
    fontSize: 20,
    width: "100%",
    marginVertical: 25,
  },
  primaryButton: {
    marginTop: 30,
    backgroundColor: "white",
    width: "100%",
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  secondaryButton: {
    marginTop: 10,
    width: "100%",
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryBtnText: {
    color: "white",
    fontSize: 18,
  },
});
