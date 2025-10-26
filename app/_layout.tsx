import { Redirect, Stack } from "expo-router";
import "../global.css";
import ReactQueryProvider from "@/providers/react-query-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";

export default function RootLayout() {
  const { isAuthenticated, initializeAuth } = useAuthStore();
  useEffect(() => {
    initializeAuth();
  }, []);
  console.log(isAuthenticated(), "auth");
  // if (!isAuthenticated()) return <Redirect href="/(auth)/page" />;
  return (
    <ReactQueryProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ReactQueryProvider>
  );
}
