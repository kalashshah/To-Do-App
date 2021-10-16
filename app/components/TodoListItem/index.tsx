import React, { useState, useEffect } from "react";
import { View, TextInput } from "react-native";
import CheckBox from "../CheckBox";

interface TodoListItemProps {
  todo: {
    id: string;
    content: string;
    isComplete: boolean;
  };
}

const TodoListItem = ({ todo }: TodoListItemProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!todo) return;
    
    setIsChecked(todo.isComplete);
    setContent(todo.content);
  }, [todo]);

  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginVertical: 3 }}
    >
      <CheckBox
        isChecked={isChecked}
        onPress={() => {
          setIsChecked(!isChecked);
        }}
      />
      <TextInput
        onChangeText={setContent}
        value={content}
        style={{ flex: 1, color: "black", fontSize: 18, marginLeft: 12 }}
        multiline
      />
    </View>
  );
};

export default TodoListItem;
