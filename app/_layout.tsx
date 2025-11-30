import { ButtonBackNavigation } from "@/components/customs/buttons/ButtonBackNavigation";
import { SplashScreenController } from "@/components/customs/SplashScreenController";
import { useAuthStore } from "@/hooks/stores/useAuthStore";
import { colors } from "@/styles/colors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import ToastManager from "toastify-react-native";

export default function Root() {
  // Set up the auth context and render your layout inside of it.
  const queryClient = new QueryClient();
  return (
    <>
      {/* <StatusBar barStyle={"dark-content"} /> */}
      <QueryClientProvider client={queryClient}>
        <SplashScreenController />
        <RootNavigator />
        <ToastManager />
      </QueryClientProvider>
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
