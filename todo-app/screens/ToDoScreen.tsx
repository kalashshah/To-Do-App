import React, { useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import TodoListItem from "../components/TodoListItem";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function ToDoScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [todos, setTodos] = useState([
    { id: "1", content: "Complete assignments", isComplete: true },
    { id: "2", content: "GCP", isComplete: false },
    { id: "3", content: "Sleep early", isComplete: false },
  ]);

  const addNewTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 0, { id: "4", content: "", isComplete: false });
    setTodos(newTodos);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <FlatList
        data={todos}
        renderItem={({ item, index }) => (
          <TodoListItem todo={item} onSubmit={() => addNewTodo(index + 1)} />
        )}
        style={{ width: "100%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
