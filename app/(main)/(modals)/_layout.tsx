import { HeaderModal } from "@/components/HeaderModal";
import { Stack } from "expo-router";

// ModalsLayout
export default function ModalsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="add-post"
        options={{
          presentation: "modal",
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
          animation: "slide_from_left",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="answer-question"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
