import { colors } from "@/styles/colors";
import { globalStyle } from "@/styles/globalStyles";
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

export const ButtonSolid = ({
  onPress,
  title,
  buttonStyle,
  textStyle,
  isLoading = false,
  ...rest
}: Props) => {
  const isDisabled = rest.disabled || rest["aria-disabled"] || isLoading;

  return (
    <Pressable
      onPress={onPress}
      style={[
        globalStyle.button,
        styles.button,
        isDisabled && styles.disabled,
        buttonStyle,
      ]}
      {...rest}
    >
      <TextInter style={[globalStyle.buttonText, styles.text, textStyle]}>
        {isLoading ? "Loading..." : title}
      </TextInter>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
  },
  disabled: {
    backgroundColor: `${colors.primary}80`,
  },
  text: {
    color: colors.white,
  },
});
