import React from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import authImage from "@/assets/images/auth1.png";
import googleImage from "@/assets/images/google.png";
import useSocialAuth from "@/hooks/useSocialAuth";
import {
  GoogleSignin,
  GoogleSigninButton,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import useGoogleOauth from "@/hooks/useGoogleOauth";
import { useAuth } from "@/providers/auth-provider";
import { useAuthStore } from "@/stores/useAuthStore";

const AuthPage = () => {
  const isLoading = false;
  // const { mutateAsync, isPending, error } = useSocialAuth();

  const { handleGoogleSignIn } = useGoogleOauth();

  const { user } = useAuthStore();
  console.log(user, "ERROR");

  return (
    <View className="flex-1 bg-white">
      <View className="justify-between flex-1 px-8">
        <View className="justify-center flex-1">
          {/* Demo image */}
          <View className="items-center">
            <Image
              source={authImage}
              className="size-96"
              resizeMode="contain"
            />
          </View>
          <View className="flex-col gap-2">
            <TouchableOpacity
              className="flex-row items-center justify-center px-6 py-3 bg-white border border-gray-300 rounded-full"
              onPress={handleGoogleSignIn}
              // disabled={isPending}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2, //only for android
              }}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <View className="flex-row items-center justify-center">
                  <Image
                    source={googleImage}
                    className="mr-3 size-10"
                    resizeMode="contain"
                  />
                  <Text className="text-base font-medium text-black">
                    Continue with Google
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          {/* Term & Condition */}
          <Text className="px-2 mt-6 text-xs leading-4 text-center text-gray-500">
            By signing up, you are agreeing to our{" "}
            <Text className="text-blue-500">Terms</Text> {", "}
            <Text className="text-blue-500"> Privacy Policy </Text>
            {", and "}
            <Text>Conditions</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AuthPage;
