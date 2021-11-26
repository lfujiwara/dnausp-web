import { useSession } from "next-auth/react";

export const useGAPIAccessToken = () => {
  const sess = useSession();
  return sess.data?.accessToken + "";
};
