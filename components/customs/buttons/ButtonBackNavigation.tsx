import { colors } from "@/styles/colors";
import { globalStyle } from "@/styles/globalStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Pressable, PressableProps } from "react-native";

interface Props extends PressableProps {}

export const ButtonBackNavigation = ({ ...rest }: Props) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => {
        if (router.canGoBack()) router.back();
        else router.replace("/login");
      }}
      style={globalStyle.backButton}
      {...rest}
    >
      <Ionicons
        name="chevron-back-outline"
        size={24}
        color={colors.primaryBlack}
      />
    </Pressable>
  );
};
