import { useCallback, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { BackendAuthContext } from "@auth/backend/backend-auth-context";

const LOCAL_STORAGE_TOKEN_KEY = "_token";
const retrieveFromLocalStorage = () =>
  localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
const storeInLocalStorage = (token: string) =>
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
const removeFromLocalStorage = () =>
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);

const decode = (jwt: string): any => {
  try {
    return jwtDecode(jwt);
  } catch (err) {
    console.error("Error loading token", err);
  }
  return null;
};

export const useBackendAuthManager = () => {
  const [state, setState] = useContext(BackendAuthContext);
  const [loadState, setLoadState] = useState({
    isLoading: false,
    isError: false,
  });

  const handleJWT = (jwt: string) => {
    const result = decode(jwt);

    if (!result || result.status !== "OK")
      return { status: result.status, reason: result.reason };

    storeInLocalStorage(jwt);
    setState({
      token: jwt,
      tokenInfo: { expiresAt: result.exp },
      profile: {
        name: result.user.name,
        email: result.user.email,
        givenName: result.user.givenName,
      },
    });
  };

  const handleLogout = () => {
    removeFromLocalStorage();
    setState({});
  };

  const loginHandlers = {
    google: () => {
      const url = process.env.NEXT_PUBLIC_BACKEND_GOOGLE_AUTH_URL + "";
      if (!url) return;
      window.location.href = url;
    },
  };

  const tryLoadFromLocalStorage = useCallback(() => {
    setLoadState({ ...loadState, isLoading: true });
    const token = retrieveFromLocalStorage();
    if (!!token) handleJWT(token);
    setLoadState({ ...loadState, isLoading: false });
  }, []);

  useEffect(() => {
    tryLoadFromLocalStorage();
  }, [tryLoadFromLocalStorage]);

  const isAuthenticated =
    state.tokenInfo && state.tokenInfo.expiresAt * 1000 > Date.now();

  return {
    handleJWT,
    handleLogout,
    loginHandlers,
    isAuthenticated,
    token: state.token,
    profile: state.profile,
  };
};
