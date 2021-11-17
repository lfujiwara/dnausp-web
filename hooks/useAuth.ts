import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export const useAuth = () => {
  const { data, status } = useSession();

  useEffect(() => {
    if (data?.error === "RefreshAccessTokenError") signIn();
  }, [data]);

  return {
    user: data?.user,
    gApiAccessToken: data?.accessToken,
    status,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    isUnauthenticated: status === "unauthenticated",
  };
};
