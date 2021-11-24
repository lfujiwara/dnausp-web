import { RequireBackendAuth } from "@auth/backend/require-backend-auth";
import { useBackendAuthManager } from "@auth/backend/use-backend-auth-manager";
import { Center } from "@chakra-ui/react";

export default function AppRoot() {
  const { profile } = useBackendAuthManager();

  return (
    <RequireBackendAuth>
      {profile && <Center>Olá, {profile.name}.</Center>}
    </RequireBackendAuth>
  );
}
