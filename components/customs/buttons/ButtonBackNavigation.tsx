import { colors } from "@/styles/colors";
import { globalStyle } from "@/styles/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, PressableProps } from "react-native";

interface Props extends PressableProps {
  icon?: React.ReactNode;
}

export const ButtonBackNavigation = ({ icon, ...rest }: Props) => {
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
      {icon ?? (
        <MaterialIcons
          name="keyboard-backspace"
          size={24}
          color={colors.primaryBlack}
        />
      )}
    </Pressable>
  );
};
