import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// UI
import { Toaster } from "@/components/ui/sonner";

// Context
import { UserProvider } from "@/context/UserContext";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Component {...pageProps} />;
        <Toaster position="top-right" duration={3000} />
      </UserProvider>
    </QueryClientProvider>
  );
}
