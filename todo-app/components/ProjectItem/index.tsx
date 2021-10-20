import React from "react";
import { Text, View, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./styles";

interface ProjectItemProps {
  project: {
    id: string;
    title: string;
    createdAt: string;
  };
}

const index = ({ project }: ProjectItemProps) => {
  const onPress = () => {
    console.warn("Click")
  }

  return (
    <Pressable onPress={onPress} style={styles.wrapper}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="file-outline" size={28} color="grey" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{project.title}</Text>
        <Text style={styles.time}>{project.createdAt}</Text>
      </View>
    </Pressable>
  );
};

export default index;
