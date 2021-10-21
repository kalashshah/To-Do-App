import React, { useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import ProjectItem from "../components/ProjectItem";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function ProjectsScreen() {
  const [project, setProjects] = useState([
    { id: "1", title: "Project 1", createdAt: "4d" },
    { id: "1", title: "Project 1", createdAt: "4d" },
    { id: "1", title: "Project 1", createdAt: "4d" },
  ]);

  return (
    <View style={styles.container}>
      <FlatList
        data={project}
        renderItem={({ item }) => <ProjectItem project={item} />}
        style={{width: "100%"}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
