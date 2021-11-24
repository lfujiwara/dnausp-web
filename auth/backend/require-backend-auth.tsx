import { FC } from "react";
import { useBackendAuthManager } from "@auth/backend/use-backend-auth-manager";

export const RequireBackendAuth: FC = ({ children }) => {
  const auth = useBackendAuthManager();

  if (!auth.isAuthenticated) {
    return <></>;
  }

  return <>{children}</>;
};
