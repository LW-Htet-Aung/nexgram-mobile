import useGoogleOauth from "@/hooks/useGoogleOauth";
import { useAuthStore } from "@/stores/useAuthStore";
import React from "react";
import { Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Button from "@/components/ui/button";
type Props = {};

const HomePage = (props: Props) => {
  const { user, loading } = useAuthStore();
  const { handleGoogleSignOut } = useGoogleOauth();

  return (
    <View>
      <Text>Index</Text>
      <Button className="flex-row" onPress={handleGoogleSignOut}>
        {loading ? (
          <>
            <Feather className="animate-spin" size={16} name="loader" />
            <Text>Loading</Text>
          </>
        ) : (
          <Text className="text-white">Logout</Text>
        )}
      </Button>
    </View>
  );
};

export default HomePage;
