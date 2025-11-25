import { colors } from "@/styles/colors";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import { TextInter } from "../texts/TextInter";

interface Props extends PressableProps {
  onPress: (data?: any) => void;
  title: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
}

export const ButtonPrimary = ({
  onPress,
  title,
  buttonStyle,
  textStyle,
  isLoading = false,
  ...rest
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, buttonStyle]}
      disabled={isLoading}
      {...rest}
    >
      <TextInter style={[styles.text, textStyle]}>{title}</TextInter>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 14,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  text: {
    textAlign: "center",
    color: "white",
    fontWeight: 600,
    fontSize: 14,
  },
});
