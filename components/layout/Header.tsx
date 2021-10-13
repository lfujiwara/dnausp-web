import { Box, Container, HStack } from "@chakra-ui/layout";
import { Flex, Heading } from "@chakra-ui/react";

import { GoogleLoginOrLogout } from "../auth/GoogleLoginOrLogout";
import Image from "next/image";
import { useGoogleAuthManager } from "../../auth/google/google-auth.context";

export const Header = () => {
  const gAuthManager = useGoogleAuthManager();

  return (
    <Box borderBottomWidth="thin" borderBottomColor="gray.100">
      <Container maxW="container.lg">
        <HStack align="center">
          <Image src="/dnausp.svg" width="64" height="64" />
          <Heading color="gray.700" fontWeight="medium">
            Painel
          </Heading>
          <Box flex="1" />
          <GoogleLoginOrLogout
            isLoading={gAuthManager.isLoading}
            isSignedIn={gAuthManager.isSignedIn}
            onSignIn={gAuthManager.signIn}
            onSignOut={gAuthManager.signOut}
          />
        </HStack>
      </Container>
    </Box>
  );
};
