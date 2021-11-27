import { FC } from "react";
import { useBackendAuthManager } from "@auth/backend/use-backend-auth-manager";

export const RequireBackendAuth: FC = ({ children }) => {
  const auth = useBackendAuthManager();

  if (!auth.isAuthenticated) {
    return <></>;
  }

  return <>{children}</>;
};

export const WrapRequireBackendAuth: (component: FC) => FC =  // eslint-disable-next-line react/display-name
  (Component) => (props) =>
    (
      <RequireBackendAuth>
        <Component {...props} />
      </RequireBackendAuth>
    );
