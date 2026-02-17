import { HeaderModal } from "@/components/customs/HeaderModal";
import { Stack } from "expo-router";

// ModalsLayout
export default function ModalsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_bottom", // default semua modal
      }}
    >
      <Stack.Screen
        name="add-post"
        options={{
          headerShown: false,
        }}
      />

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
          // ❌ Hapus presentation: "modal"
          animation: "slide_from_left",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="answer-question"
        options={{
          // ❌ Hapus presentation: "modal"
          // ikut screenOptions slide_from_bottom
          headerShown: false,
        }}
      />
    </Stack>
  );
}
