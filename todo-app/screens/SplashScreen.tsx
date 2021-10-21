import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    if (isAuthenticated()) {
      navigation.navigate("Home");
    } else {
      navigation.navigate("LoginScreen");
    }
  }, []);

  const isAuthenticated = () => {
    return false;
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator color="grey" size="large" />
    </View>
  );
};

export default SplashScreen;
