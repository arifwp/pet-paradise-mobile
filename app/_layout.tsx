import { SplashScreenController } from "@/components/customs/SplashScreenController";
import { useAuthStore } from "@/hooks/stores/useAuthStore";
import { Stack } from "expo-router";

export default function Root() {
  // Set up the auth context and render your layout inside of it.
  return (
    <>
      <SplashScreenController />
      <RootNavigator />
    </>
  );
}

// Create a new component that can access the SessionProvider context later.
function RootNavigator() {
  const { session } = useAuthStore();

  return (
    <Stack>
      <Stack.Protected guard={!!session}>
        <Stack.Screen
          name="(app)"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}
