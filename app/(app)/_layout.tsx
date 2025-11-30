import { ButtonLogout } from "@/components/customs/buttons/ButtonLogout";
import { useAuthStore } from "@/hooks/stores/useAuthStore";
import { colors } from "@/styles/colors";
import { Stack } from "expo-router";

export default function AppLayout() {
  const { isProfileComplete } = useAuthStore();

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <Stack.Protected guard={isProfileComplete}>
        <Stack.Screen name="tabs" options={{ headerShown: false }} />

        <Stack.Screen
          name="modal/add-post"
          options={{
            presentation: "containedModal",
            animation: "slide_from_bottom",
            gestureEnabled: true,
            gestureDirection: "vertical",
            headerShown: false,
            contentStyle: { backgroundColor: "transparent" },
          }}
        />
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
