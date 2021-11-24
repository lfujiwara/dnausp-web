import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useBackendAuthManager } from "@auth/backend/use-backend-auth-manager";
import { Center } from "@chakra-ui/react";
import { Text } from "@chakra-ui/layout";

const errorMessage = (code: string) => {
  if (code === "WHITELIST") {
    return "Você não tem permissão para fazer login.";
  }

  return "Ocorreu um erro, tente novamente.";
};

export default function Google() {
  const router = useRouter();
  const m = useBackendAuthManager();
  const [error, setError] = React.useState<string | null>(null);

  const handleIsAuthenticated = () => router.push("/");

  useEffect(() => {
    const token = router.query.token?.toString();
    if (token !== undefined) {
      const err = m.handleJWT(token);
      if (err) setError(errorMessage(err.reason));
    }
  }, [router.query]);

  useEffect(() => {
    if (m.isAuthenticated) handleIsAuthenticated();
  }, [m.isAuthenticated]);

  return (
    <Center>
      {!error ? <Text>Finalizando login...</Text> : <Text>{error}</Text>}
    </Center>
  );
}
