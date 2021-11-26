import { Center, Text, VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { signIn, useSession } from "next-auth/react";

import { FaGoogle } from "react-icons/fa";
import Icon from "@chakra-ui/icon";
import { useEffect } from "react";

export const RequireGoogleLogin: React.FC<any> = ({ children }) => {
  const sess = useSession();

  useEffect(() => {
    if (sess.data?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [sess]);

  if (!sess.data) {
    return (
      <Center p="4">
        <VStack align="center" spacing="2">
          <Text textAlign="center">
            É preciso estar logado com sua conta Google para acessar esse
            conteúdo.
          </Text>
          <Button onClick={() => signIn()} colorScheme="blue">
            <Icon as={FaGoogle} mr="4" />
            Entrar
          </Button>
        </VStack>
      </Center>
    );
  }

  return <>{children}</>;
};
