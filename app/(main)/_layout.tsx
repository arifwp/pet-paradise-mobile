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
      {/* TABS */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* SCREENS */}
      <Stack.Screen name="(screens)" options={{ headerShown: false }} />
    </Stack>
  );
}
