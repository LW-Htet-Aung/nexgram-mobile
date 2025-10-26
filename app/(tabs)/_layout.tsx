import { useAuthStore } from "@/stores/useAuthStore";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { Feather } from "@expo/vector-icons";
type Props = {};

const TabsLayout = (props: Props) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated()) return <Redirect href="/(auth)/page" />;

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
