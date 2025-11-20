import { useAuthStore } from "@/hooks/stores/useAuthStore";
import { Text, View } from "react-native";

export default function Index() {
  const { signOut } = useAuthStore();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={() => {
          // The guard in `RootNavigator` redirects back to the sign-in screen.
          signOut();
        }}
      >
        Sign Out
      </Text>
    </View>
  );
}
