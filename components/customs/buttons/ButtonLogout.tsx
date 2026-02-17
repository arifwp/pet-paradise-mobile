import { useAuthStore } from "@/hooks/stores/useAuthStore";
import { colors } from "@/styles/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { TextInter } from "../texts/TextInter";

interface Props extends PressableProps {
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
}

export const ButtonLogout = ({
  buttonStyle,
  textStyle,
  isLoading = false,
  ...rest
}: Props) => {
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();
  const opacity = useSharedValue(1);

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await logout();
    },
    onSuccess: () => {},
    onError: () => {},
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });

  return (
    <Pressable
      onPress={isLoading ? () => {} : () => logoutMutation.mutate()}
      style={[styles.button, buttonStyle]}
      disabled={logoutMutation.isPending}
      {...rest}
    >
      <MaterialCommunityIcons name="logout" size={24} color={colors.red400} />

      <TextInter style={[styles.text, textStyle]}>
        {isLoading ? "Loading..." : "Logout"}
      </TextInter>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    color: colors.red400,
    fontWeight: 600,
    fontSize: 14,
  },
});
