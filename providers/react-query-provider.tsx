import { queryClient } from "@/libs/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
