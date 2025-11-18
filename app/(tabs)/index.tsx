import useGoogleOauth from "@/hooks/useGoogleOauth";
import { useAuthStore } from "@/stores/useAuthStore";
import React from "react";
import { Text, View } from "react-native";
import Button from "@/components/ui/button";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
type Props = {};

const HomeScreen = (props: Props) => {
  const { user, loading } = useAuthStore();
  const { handleSignOut } = useGoogleOauth();

  return (
    <SafeAreaView className="flex-1">
      <Text>Index</Text>

      <Button
        loading={loading}
        icon={<Feather name="log-out" />}
        className="flex-row"
        onPress={handleSignOut}
      >
        {loading ? (
          <>
            <Feather className="animate-spin" size={16} name="loader" />
            <Text>Loading</Text>
          </>
        ) : (
          <Text className="text-white">Logout</Text>
        )}
      </Button>
    </SafeAreaView>
  );
};

export default HomeScreen;
