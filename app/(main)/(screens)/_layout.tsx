import { HeaderModal } from "@/components/HeaderModal";
import { useAuthStore } from "@/hooks/stores/useAuthStore";
import { Stack } from "expo-router";

export default function LayoutScreens() {
  const { user } = useAuthStore();
  const isProfileComplete = !!user?.phone;

  return (
    <Stack>
      <Stack.Protected guard={isProfileComplete}>
        <Stack.Screen name="search" options={{ headerShown: false }} />

        <Stack.Screen
          name="add-post"
          options={{
            headerShown: false,
          }}
        />

        {/* MODALS */}
        <Stack.Screen
          name="list-communities"
          options={{
            presentation: "formSheet",
            sheetAllowedDetents: [0.4],
            sheetCornerRadius: 32,
            header: () => <HeaderModal title="Choose Viewer" />,
          }}
        />

        <Stack.Screen
          name="image-preview"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="answer-question"
          options={{
            headerShown: false,
          }}
        />
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
