import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
  AsyncStorage,
} from "react-native";
import { useMutation, gql } from "@apollo/client";

const SignUpMutation = gql`
  mutation signUp($email: String!, $password: String!, $name: String!) {
    signUp(input: { email: $email, password: $password, name: $name }) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const [signUp, { data, error, loading }] = useMutation(SignUpMutation);
  if (error) {
    Alert.alert("Error signing up, please try again");
  } else if (data) {
    console.log(data);
    // AsyncStorage.setItem("token", data.signUp.token).then(() => {
    //   navigation.navigate("Home");
    // });
  }

  const submitHandler = () => {
    signUp({ variables: { name, email, password } });
  };

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
        {loading && <ActivityIndicator color="grey" size="large" />}
        <Text style={styles.primaryBtnText}>Sign Up</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("LoginScreen")}
        style={styles.secondaryButton}
        disabled={loading}
      >
        <Text style={styles.secondaryBtnText}>
          Already have an account? Login
        </Text>
      </Pressable>
    </View>
  );
};

export default SignUpScreen;

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
    flexDirection: "row",
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
