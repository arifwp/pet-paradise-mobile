import { colors } from "@/styles/colors";
import { Image } from "expo-image";
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
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
}

export const ButtonGoogleAuth = ({
  buttonStyle,
  textStyle,
  isLoading = false,
  ...rest
}: Props) => {
  return (
    <Pressable
      onPress={() => {}}
      style={[styles.button, buttonStyle]}
      disabled={isLoading}
      {...rest}
    >
      <Image
        style={styles.img}
        source={require("@/assets/images/logo_google.png")}
        contentFit="contain"
      />

      <TextInter style={[styles.text, textStyle]}>
        Continue with Google
      </TextInter>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 42,
    height: 42,
    objectFit: "contain",
  },
  button: {
    padding: 2,
    borderRadius: 8,
    backgroundColor: "#F2F2F2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.primaryBlack,
    borderWidth: 1,
    overflow: "hidden",
  },
  text: {
    textAlign: "center",
    color: colors.primaryBlack,
    fontWeight: 600,
    fontSize: 14,
  },
});
