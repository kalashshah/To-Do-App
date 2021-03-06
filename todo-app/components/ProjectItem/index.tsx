import React from "react";
import { Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
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
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("ToDoScreen", { id: project.id });
  };

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
