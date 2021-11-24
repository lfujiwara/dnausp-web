import { useCallback, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { BackendAuthContext } from "@auth/backend/backend-auth-context";

const LOCAL_STORAGE_TOKEN_KEY = "_token";
const retrieveFromLocalStorage = () =>
  localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
const storeInLocalStorage = (token: string) =>
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);

const decode = (jwt: string) => {
  try {
    const data: any = jwtDecode(jwt);
    return data;
  } catch (err) {
    console.log("Error loading token", err);
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
    if (result === null) return;

    if (result.status !== "OK")
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
    isAuthenticated,
    token: state.token,
    profile: state.profile,
  };
};
