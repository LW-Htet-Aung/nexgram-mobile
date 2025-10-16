import { Stack } from "expo-router";
import "../global.css";
import ReactQueryProvider from "@/providers/react-query-provider";

export default function RootLayout() {
  return (
    <ReactQueryProvider>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </ReactQueryProvider>
  );
}
