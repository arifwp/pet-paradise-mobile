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

export const InputPhoneNumber = ({
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

  const handleChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    onValueChange(cleaned);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInter style={[styles.label, labelStyle]}>{label}</TextInter>

      <TextInput
        style={[
          styles.input,
          focused && styles.inputFocus,
          error && styles.inputError,
        ]}
        placeholder={placeholder ? placeholder : undefined}
        onChangeText={handleChange}
        autoCorrect={false}
        autoCapitalize="none"
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...rest}
      />

      {error && <Text style={styles.textError}>{error}</Text>}
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
    borderColor: "#ACAFB5",
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
  },
  inputFocus: {
    borderColor: colors.primary,
  },
  inputError: {
    borderColor: "red",
  },
  textError: {
    color: "red",
    fontSize: 12,
  },
});
