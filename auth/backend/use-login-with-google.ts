const route = process.env.NEXT_PUBLIC_BACKEND_GOOGLE_AUTH_URL + "";

export const useLoginWithGoogle = () => {
  return () => (window.location.href = route);
};
