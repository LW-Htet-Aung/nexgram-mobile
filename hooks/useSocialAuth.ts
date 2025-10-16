import React, { useState } from "react";

const useSocialAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  return { loading, handleSocialAuth };
};

export default useSocialAuth;
