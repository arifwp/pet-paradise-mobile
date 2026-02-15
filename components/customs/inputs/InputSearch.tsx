import { colors } from "@/styles/colors";
import { globalStyle } from "@/styles/globalStyles";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface Props extends TextInputProps {
  placeholder?: string;
  value: string;
  onValueChange: (value: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

export const InputSearch = ({
  placeholder,
  value,
  onValueChange,
  containerStyle,
  inputStyle,
  ...rest
}: Props) => {
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <View
      style={[
        styles.textInput,
        focused && globalStyle.inputFocus,
        containerStyle,
      ]}
    >
      <Feather name="search" size={16} color={colors.neutral200} />

      <TextInput
        style={[styles.input, inputStyle]}
        multiline={false}
        placeholder={placeholder ? placeholder : undefined}
        onChangeText={onValueChange}
        autoCorrect={false}
        autoCapitalize="none"
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 40,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    height: 40,
    borderColor: colors.neutral400,
    borderRadius: 8,
    gap: 12,
    paddingHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});
