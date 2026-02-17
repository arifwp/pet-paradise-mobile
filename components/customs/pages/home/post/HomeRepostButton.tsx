import { TextInter } from "@/components/customs/texts/TextInter";
import { colors } from "@/styles/colors";
import { globalStyle } from "@/styles/globalStyles";
import { Feather } from "@expo/vector-icons";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";

export const HomeRepostButton = ({
  postId,
  countRepost,
  isRepost,
  iconColor = colors.primaryBlack,
  iconSize = 16,
  containerStyle,
  textStyle,
}: {
  postId: string | undefined;
  countRepost: number | undefined;
  isRepost: boolean | undefined;
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
      onPress={() => {
        console.log("clicked re-post", postId);
      }}
    >
      <Feather
        name="repeat"
        size={iconSize}
        color={isRepost ? colors.primary : iconColor}
      />

      <TextInter style={[styles.text, textStyle]}>{countRepost}</TextInter>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: { fontSize: 12, color: colors.primaryBlack },
});
