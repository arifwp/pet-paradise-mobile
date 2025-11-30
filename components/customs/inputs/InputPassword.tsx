import { colors } from "@/styles/colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
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

export const InputPassword = ({
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
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const togglePasswordVisibility = () => {
    setTimeout(() => {
      setIsVisible((prev) => !prev);
    }, 0);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInter style={[styles.label, labelStyle]}>{label}</TextInter>

      <View
        style={[
          styles.textInput,
          focused && styles.inputFocus,
          error && styles.inputError,
          inputStyle,
        ]}
      >
        <TextInput
          style={styles.input}
          multiline={false}
          secureTextEntry={isVisible}
          placeholder={placeholder ? placeholder : undefined}
          onChangeText={onValueChange}
          autoCorrect={false}
          autoCapitalize="none"
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
        />

        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={{ padding: 4 }}
        >
          {isVisible ? (
            <MaterialCommunityIcons name="eye" size={20} color="black" />
          ) : (
            <MaterialCommunityIcons name="eye-off" size={20} color="black" />
          )}
        </TouchableOpacity>
      </View>

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
    flex: 1,
    height: 40,
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
  textInput: {
    borderWidth: 1,
    height: 40,
    borderColor: colors.neutral400,
    borderRadius: 8,
    paddingHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});
