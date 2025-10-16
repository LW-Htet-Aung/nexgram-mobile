import useAuthUser from "@/hooks/useAuthUser";
import { Redirect, Stack } from "expo-router";
import React from "react";

const AuthRoutesLayout = () => {
  const { data } = useAuthUser();
  console.log(data, "data");
  if (data?.isLoggedIn) return <Redirect href="/" />;
  return <Stack />;
};

export default AuthRoutesLayout;
