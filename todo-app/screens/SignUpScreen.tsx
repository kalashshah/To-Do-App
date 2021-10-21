import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

const LoginScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const submitHandler = () => {};

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        placeholderTextColor="grey"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
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
        <Text style={styles.primaryBtnText}>Sign Up</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("LoginScreen")}
        style={styles.secondaryButton}
      >
        <Text style={styles.secondaryBtnText}>
          Already have an account? Login
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
    marginVertical: 20,
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
