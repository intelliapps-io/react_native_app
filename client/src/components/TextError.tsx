import React from "react";
import { Text } from "@ui-kitten/components";
import { StyleProp, TextStyle, View } from "react-native";

interface TextErrorProps {
  value: string,
  style?: StyleProp<TextStyle>
}

export const TextError: React.FC<TextErrorProps> = props => {
  if (!props.style)
    props.style = {}
  return (
    <Text style={[{ color: 'red' }, props.style]}>{props.value}</Text>
  );
}