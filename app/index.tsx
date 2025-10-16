import { Text, View } from "react-native";
import ReactQueryProvider from "@/providers/react-query-provider";

export default function Index() {
  return (
    // <ReactQueryProvider>
    <View className="items-center justify-center flex-1 bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
    </View>
    // </ReactQueryProvider>
  );
}
