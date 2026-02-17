import { globalStyle } from "@/styles/globalStyles";
import { useState } from "react";
import {
  StyleProp,
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
    <View style={[globalStyle.inputContainer, containerStyle]}>
      <TextInter style={[globalStyle.label, labelStyle]}>{label}</TextInter>

      <TextInput
        style={[
          globalStyle.input,
          focused && globalStyle.inputFocus,
          error && globalStyle.inputError,
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

      {error && <Text style={globalStyle.textError}>{error}</Text>}
    </View>
  );
};
