import { colors } from "@/styles/colors";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from "react-native";

interface Props extends TextProps {
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

export const TextInter = ({ style, children, ...rest }: Props) => {
  return (
    <Text style={[styles.text, { fontFamily: "Inter" }, style]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 400,
    fontSize: 14,
    color: colors.primaryBlack,
  },
});
