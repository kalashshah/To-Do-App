import React from "react";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface CheckboxProps {
  isChecked: boolean;
  onPress: () => void;
}

const CheckBox = (props: CheckboxProps) => {
  const { isChecked, onPress } = props;
  const name = isChecked ? "checkbox-marked-outline" : "checkbox-blank-outline";

  return (
    <Pressable onPress={onPress}>
      <MaterialCommunityIcons name={name} size={30} color="white" />
    </Pressable>
  );
};

export default CheckBox;
