import { colors } from "@/styles/colors";
import { Stack } from "expo-router";

export default function LayoutMain() {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(screens)" options={{ headerShown: false }} />

      {/* MODALS */}
      <Stack.Screen name="(modals)" options={{ headerShown: false }} />
    </Stack>
  );
}
