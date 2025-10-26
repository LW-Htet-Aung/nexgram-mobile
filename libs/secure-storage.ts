import * as SecureStorage from "expo-secure-store";

export const saveToSecureStorage = async <T>(
  key: string,
  value: T
): Promise<void> => {
  try {
    await SecureStorage.setItemAsync(key, JSON.stringify(value));
  } catch (error) {
    console.log("Error saving to storage:", error);
  }
};

export const getFromSecureStorage = async <T = unknown>(
  key: string
): Promise<T | null> => {
  try {
    const data = await SecureStorage.getItemAsync(key);
    return data ? (JSON.parse(data) as T) : null;
  } catch (error) {
    console.log("Error getting from storage:", error);
    return null;
  }
};

export const removeFromSecureStorage = async (key: string): Promise<void> => {
  try {
    await SecureStorage.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing from storage:", error);
  }
};
