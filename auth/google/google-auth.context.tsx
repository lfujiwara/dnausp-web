import {
  GoogleAuthData,
  GoogleAuthManager,
  RawGoogleAuthData,
} from "./google-auth-data";
import { createContext, useContext, useState } from "react";
import { useGoogleLogin, useGoogleLogout } from "react-google-login";

import { GoogleAuthDataReducer } from "./google-auth-data.reducer";
import { GoogleLoginConstants } from "../../constants/google-login.constants";

type ManagerState = Omit<
  GoogleAuthManager,
  "signIn" | "signOut" | "data" | "isAuthLoaded"
>;

export const GoogleAuthManagerContext = createContext<GoogleAuthManager>(
  undefined as any
);

export const useGoogleAuthManager = () => useContext(GoogleAuthManagerContext);
export const useGoogleAuthData = () => useGoogleAuthManager().data;

export const GoogleAuthManagerProvider: React.FC<any> = ({ children }) => {
  const [state, setState] = useState<GoogleAuthData>(undefined as any);
  const [managerState, setManagerState] = useState<ManagerState>({
    isSignedIn: false,
    isLoading: false,
    isError: false,
  });

  const onSignInRequest = () => {
    setManagerState({
      ...managerState,
      isLoading: true,
      isError: false,
    });
  };

  const onSignInSuccess = (data: RawGoogleAuthData) => {
    setState(GoogleAuthDataReducer(data));
    setManagerState({
      ...managerState,
      isSignedIn: true,
      isLoading: false,
      isError: false,
    });
  };

  const onSignInFailure = () => {
    setManagerState({
      ...managerState,
      isSignedIn: false,
      isLoading: false,
      isError: true,
    });
  };

  const onSignOutSuccess = () => {
    setManagerState({
      ...managerState,
      isSignedIn: false,
      isLoading: false,
      isError: false,
    });
    setState(undefined as any);
  };

  const onSignOutFailure = () => {
    setManagerState({
      ...managerState,
      isSignedIn: true,
      isLoading: false,
      isError: true,
    });
  };

  const { signIn, loaded: loadedSignIn } = useGoogleLogin({
    ...GoogleLoginConstants,
    isSignedIn: true,
    onRequest: onSignInRequest,
    onSuccess: onSignInSuccess as any,
    onFailure: onSignInFailure,
    scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
  });
  const { signOut, loaded: loadedSignOut } = useGoogleLogout({
    ...GoogleLoginConstants,
    onFailure: onSignOutFailure,
    onLogoutSuccess: onSignOutSuccess,
  });

  const valueToProvide: GoogleAuthManager = {
    signIn,
    signOut,
    ...managerState,
    isAuthLoaded: loadedSignIn && loadedSignOut,
    data: state,
  };

  return (
    <GoogleAuthManagerContext.Provider value={valueToProvide}>
      {children}
    </GoogleAuthManagerContext.Provider>
  );
};
