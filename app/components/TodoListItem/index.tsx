import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import CheckBox from "../CheckBox";

interface TodoListItemProps {
  todo: {
    id: string;
    content: string;
    isComplete: boolean;
  };
  onSubmit: () => void;
}

const TodoListItem = ({ todo, onSubmit }: TodoListItemProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [content, setContent] = useState("");
  const input = useRef(null);

  useEffect(() => {
    if (!todo) return;

    setIsChecked(todo.isComplete);
    setContent(todo.content);
  }, [todo]);

  useEffect(() => {
    if (input.current) input?.current?.focus();
  }, [input]);

  const onKeyPress = (e: KeyboardEvent) => {
    if (e.nativeEvent.key === "Backspace" && content === "") {
      console.warn("Delete");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "android" ? 130 : 0}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 3,
        }}
      >
        <CheckBox
          isChecked={isChecked}
          onPress={() => {
            setIsChecked(!isChecked);
          }}
        />
        <TextInput
          ref={input}
          onChangeText={setContent}
          value={content}
          style={{ flex: 1, color: "black", fontSize: 18, marginLeft: 12 }}
          multiline
          onSubmitEditing={onSubmit}
          blurOnSubmit
          onKeyPress={onKeyPress}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default TodoListItem;
