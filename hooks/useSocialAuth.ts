import { api } from "@/libs/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const handleSocialAuth = async () => {
  const res = await api.get("/google/");
  return res.data;
};

const useSocialAuth = () => {
  return useMutation({
    mutationKey: ["social-auth"],
    mutationFn: handleSocialAuth,
    // retry: false,
  });
};

export default useSocialAuth;
