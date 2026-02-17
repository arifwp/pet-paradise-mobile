import { ButtonLogout } from "@/components/buttons/ButtonLogout";
import { useAuthStore } from "@/hooks/stores/useAuthStore";
import { colors } from "@/styles/colors";
import { Stack } from "expo-router";

export default function LayoutMain() {
  const { user } = useAuthStore();
  const isProfileComplete = !!user?.phone;

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <Stack.Protected guard={isProfileComplete}>
        {/* Screens */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ headerShown: false }} />

        {/* Modal Screens */}
        <Stack.Screen name="(modals)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!isProfileComplete}>
        <Stack.Screen
          name="complete-profile"
          options={{
            headerShown: true,
            headerShadowVisible: false,
            headerTitle: undefined,
            headerTintColor: colors.white,
            headerRight: () => <ButtonLogout />,
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}
