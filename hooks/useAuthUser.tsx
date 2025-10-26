import { api } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const getUser = async () => {
  try {
    const res = await api.get("/api/users/me");
    return { isLoggedIn: true, user: res?.data?.user };
  } catch (error) {
    return { isLoggedIn: false, user: null };
  }
};
const useAuthUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
  });
};

export default useAuthUser;
