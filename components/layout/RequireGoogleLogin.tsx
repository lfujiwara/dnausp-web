import { Box, Center, Text, VStack } from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/button";

import { FaGoogle } from "react-icons/fa";
import Icon from "@chakra-ui/icon";
import { useGoogleAuthManager } from "../../auth/google/google-auth.context";

export const RequireGoogleLogin: React.FC<any> = ({ children }) => {
  const { isSignedIn, isAuthLoaded, isError, isLoading, signIn, signOut } =
    useGoogleAuthManager();

  if (!isSignedIn) {
    return (
      <Center p="4">
        <VStack align="center" spacing="2">
          <Text textAlign="center">
            É preciso estar logado com sua conta Google para acessar esse
            conteúdo.
          </Text>
          <Button onClick={signIn} isLoading={isLoading} colorScheme="blue">
            <Icon as={FaGoogle} mr="4" />
            Entrar
          </Button>
        </VStack>
      </Center>
    );
  }

  return <>{children}</>;
};
