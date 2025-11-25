import { ButtonBackNavigation } from "@/components/customs/buttons/ButtonBackNavigation";
import { SplashScreenController } from "@/components/customs/SplashScreenController";
import { useAuthStore } from "@/hooks/stores/useAuthStore";
import { colors } from "@/styles/colors";
import { Stack } from "expo-router";

export default function Root() {
  // Set up the auth context and render your layout inside of it.
  return (
    <>
      {/* <StatusBar barStyle={"dark-content"} /> */}
      <SplashScreenController />
      <RootNavigator />
    </>
  );
}

// Create a new component that can access the SessionProvider context later.
function RootNavigator() {
  const { session } = useAuthStore();

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
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
          name="login"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="forgot-password"
          options={{
            headerShown: true,
            headerTitleStyle: { color: colors.white },
            headerBackButtonDisplayMode: "minimal",
            headerShadowVisible: false,
            headerLeft: () => <ButtonBackNavigation />,
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}
