import { useAuth } from "@/providers/auth-provider";
import { useAuthStore } from "@/stores/useAuthStore";
import { Redirect, Stack } from "expo-router";

const AuthRoutesLayout = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated()) return <Redirect href="/(tabs)" />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default AuthRoutesLayout;
