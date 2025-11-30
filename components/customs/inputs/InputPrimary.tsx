import { colors } from "@/styles/colors";
import { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { TextInter } from "../texts/TextInter";

interface Props extends TextInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onValueChange: (value: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  error?: string;
}

export const InputPrimary = ({
  label,
  placeholder,
  value,
  onValueChange,
  containerStyle,
  labelStyle,
  inputStyle,
  error,
  ...rest
}: Props) => {
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInter style={[styles.label, labelStyle]}>{label}</TextInter>

      <TextInput
        style={[
          styles.input,
          focused && styles["input-focus"],
          error && styles["input-error"],
        ]}
        placeholder={placeholder ? placeholder : undefined}
        onChangeText={onValueChange}
        autoCorrect={false}
        autoCapitalize="none"
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...rest}
      />

      {error && <Text style={styles["text-error"]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontWeight: 400,
    fontSize: 14,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.neutral400,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
  },
  "input-focus": {
    borderColor: colors.primary,
  },
  "input-error": {
    borderColor: "red",
  },
  "text-error": {
    color: "red",
    fontSize: 12,
  },
});
