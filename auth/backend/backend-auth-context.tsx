import { createContext, FC, useState } from "react";
import { useBackendAuthManager } from "@auth/backend/use-backend-auth-manager";

export interface IBackendProfile {
  name: string;
  givenName: string;
  email: string;
}

export interface ITokenInfo {
  expiresAt: number;
}

export interface IBackendAuth {
  tokenInfo?: ITokenInfo;
  token?: string;
  profile?: IBackendProfile;
}

type TBackendAuthContext = [IBackendAuth, (auth: IBackendAuth) => any];
export const BackendAuthContext = createContext<TBackendAuthContext>([
  {},
  () => undefined,
]);

const Inner: FC = ({ children }) => {
  useBackendAuthManager();
  return <>{children}</>;
};

export const BackendAuthProvider: FC = ({ children }) => {
  const _state = useState<IBackendAuth>({});

  return (
    <BackendAuthContext.Provider value={_state}>
      <Inner>{children}</Inner>
    </BackendAuthContext.Provider>
  );
};
