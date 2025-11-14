import { api } from "@/libs/axios";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useCallback, useEffect } from "react";
import { Alert } from "react-native";
import { useAuthStore } from "@/stores/useAuthStore";

const useGoogleOauth = () => {
  const { login, logout, isAuthenticated, user, loading } = useAuthStore();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
      offlineAccess: true,
    });
  }, []);

  // const handleGoogleSignIn = async () => {
  //   try {
  //     await GoogleSignin.signOut();
  //     await GoogleSignin.hasPlayServices();
  //     const res = await GoogleSignin.signIn();
  //     console.log(res, "res");
  //     if (isSuccessResponse(res)) {
  //       const response = await api.post("/google/mobile", {
  //         code: res.data.serverAuthCode,
  //       });
  //       console.log(response, "data");
  //       await login(response.data.token, response.data.user);
  //     }
  //   } catch (e) {
  //     if (isErrorWithCode(e)) {
  //       switch (e.code) {
  //         case statusCodes.IN_PROGRESS:
  //           Alert.alert("Sign in is in progress");
  //           break;
  //         case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
  //           Alert.alert("Play Service is not available");
  //           break;
  //         default:
  //       }
  //     } else {
  //       console.log(e);
  //       Alert.alert("Something went wrong");
  //     }
  //   }
  // };

  const handleGoogleSignIn = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const hasPreviousSession = await GoogleSignin.getCurrentUser();

      if (!isAuthenticated && user && hasPreviousSession) {
        await GoogleSignin.signOut();
      }

      const res = await GoogleSignin.signIn();

      if (isSuccessResponse(res)) {
        const { data } = await api.post("/google/mobile", {
          code: res.data.serverAuthCode,
        });

        // await SecureStore.setItemAsync(AUTH_TOKEN, data.token);
        await login(data.token, data.user); // ✅ no state loop here
      }
    } catch (e) {
      console.error("Google Sign-In Error:", e);
      if (isErrorWithCode(e)) {
        switch (e.code) {
          case statusCodes.IN_PROGRESS:
            Alert.alert("Sign in is in progress");
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            Alert.alert("Play Services not available");
            break;
          default:
            Alert.alert("Something went wrong");
        }
      } else {
        Alert.alert("An unknown error occurred");
      }
    }
  }, [login, isAuthenticated, user]);

  const handleSignOut = useCallback(async () => {
    try {
      const currentUser = await GoogleSignin.getCurrentUser();

      if (currentUser) {
        console.log(currentUser, "user");
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }

      await logout();
    } catch (error) {
      Alert.alert("Failed to sign out");
    }
  }, [logout]);

  return { handleGoogleSignIn, handleSignOut };
};

export default useGoogleOauth;
