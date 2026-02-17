import { TextInter } from "@/components/texts/TextInter";
import { colors } from "@/styles/colors";
import { globalStyle } from "@/styles/globalStyles";
import { FontAwesome6 } from "@expo/vector-icons";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";

export const HomeCommentButton = ({
  postId,
  countComment,
  iconColor = colors.primaryBlack,
  iconSize = 16,
  containerStyle,
  textStyle,
}: {
  postId: string | undefined;
  countComment: number | undefined;
  iconColor?: string;
  iconSize?: number;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}) => {
  return (
    <Pressable
      style={[
        globalStyle.containerRow,
        {
          gap: 4,
        },
        containerStyle,
      ]}
      onPress={(e) => {
        e.stopPropagation();
        console.log("clicked comment", postId);
      }}
    >
      <FontAwesome6 name="comment" size={iconSize} color={iconColor} />

      <TextInter style={[styles.text, textStyle]}>{countComment}</TextInter>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: { fontSize: 12, color: colors.primaryBlack },
});
