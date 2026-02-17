import { useAuthStore } from "@/hooks/stores/useAuthStore";
import { colors } from "@/styles/colors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ToastManager from "toastify-react-native";

// SplashScreen.preventAutoHideAsync();

export default function LayoutRoot() {
  const queryClient = new QueryClient();
  const { isLoading } = useAuthStore();

  // useEffect(() => {
  //   console.log("is loading", isLoading);

  //   if (!isLoading) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [isLoading]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="dark" backgroundColor={colors.white} />
        <RootNavigator />
        <ToastManager />
      </QueryClientProvider>
    </>
  );
}

function RootNavigator() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Stack>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
