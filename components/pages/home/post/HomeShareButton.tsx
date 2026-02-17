import { colors } from "@/styles/colors";
import { Feather } from "@expo/vector-icons";
import { Pressable, StyleProp, ViewStyle } from "react-native";

export const HomeShareButton = ({
  postId,
  iconColor = colors.primaryBlack,
  iconSize = 16,
  containerStyle,
}: {
  postId: string | undefined;
  iconColor?: string;
  iconSize?: number;
  containerStyle?: StyleProp<ViewStyle>;
}) => {
  return (
    <Pressable
      style={[containerStyle]}
      onPress={(e) => {
        e.stopPropagation();
        console.log("clicked share", postId);
      }}
    >
      <Feather name="share-2" size={iconSize} color={iconColor} />
    </Pressable>
  );
};
