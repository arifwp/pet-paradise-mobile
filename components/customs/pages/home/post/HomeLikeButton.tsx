import { TextInter } from "@/components/customs/texts/TextInter";
import { errMsg } from "@/constants/error";
import { colors } from "@/styles/colors";
import { globalStyle } from "@/styles/globalStyles";
import { FontAwesome } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Toast } from "toastify-react-native";

export const HomeLikeButton = ({
  postId,
  countLike,
  isLike,
  iconColor = colors.primaryBlack,
  iconSize = 16,
  containerStyle,
  textStyle,
}: {
  postId: string | undefined;
  countLike: number | undefined;
  isLike: boolean | undefined;
  iconColor?: string;
  iconSize?: number;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}) => {
  const likeMutation = useMutation({
    mutationFn: async () => {
      return true;
    },
    onSuccess: () => {
      console.log("sukses like", postId);
    },
    onError: (error) => {
      Toast.error(error?.message || errMsg.common);
    },
    onSettled: () => {},
  });

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

        likeMutation.mutate();
      }}
    >
      {isLike ? (
        <FontAwesome
          name="heart"
          size={iconSize}
          color={isLike ? colors.red600 : iconColor}
        />
      ) : (
        <FontAwesome name="heart-o" size={iconSize} color={iconColor} />
      )}

      <TextInter style={[styles.text, textStyle]}>{countLike}</TextInter>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: { fontSize: 12, color: colors.primaryBlack },
});
