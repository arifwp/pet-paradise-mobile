import { useAuthStore } from "@/hooks/stores/useAuthStore";
import { Stack } from "expo-router";

export default function LayoutScreens() {
  const { user } = useAuthStore();
  const isProfileComplete = !!user?.phone;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Protected guard={isProfileComplete}>
        <Stack.Screen name="search" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!isProfileComplete}>
        <Stack.Screen
          name="complete-profile"
          options={{ headerShown: false }}
        />
      </Stack.Protected>
    </Stack>
  );
}
