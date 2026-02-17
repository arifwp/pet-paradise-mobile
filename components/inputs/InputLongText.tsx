import { globalStyle } from "@/styles/globalStyles";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

interface Props extends TextInputProps {
  value: string | undefined;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export const InputLongText = ({
  value,
  onValueChange,
  placeholder = "Tulis disini...",
  ...rest
}: Props) => {
  return (
    <TextInput
      editable
      multiline
      onChangeText={(text) => onValueChange(text)}
      value={value ?? ""}
      autoCorrect={false}
      autoCapitalize="none"
      placeholder={placeholder}
      style={[globalStyle.input, styles.input]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: "auto",
    minHeight: 40,
    borderWidth: 0,
    padding: 0,
    borderRadius: 0,
  },
});
