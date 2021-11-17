import { Box, Container, HStack } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/react";
import Image from "next/image";
import { useAuth } from "../../hooks/useAuth";
import { signIn, signOut } from "next-auth/react";
import { GoogleLoginOrLogout } from "../auth/GoogleLoginOrLogout";

export const Header = () => {
  const { isLoading, isAuthenticated } = useAuth();
  return (
    <Box borderBottomWidth="thin" borderBottomColor="gray.100">
      <Container maxW="container.lg">
        <HStack align="center">
          <Image alt="dnausp" src="/dnausp.svg" width="64" height="64" />
          <Heading color="gray.700" fontWeight="medium">
            Painel
          </Heading>
          <Box flex="1" />
          <GoogleLoginOrLogout
            isLoading={isLoading}
            isSignedIn={isAuthenticated}
            onSignIn={signIn}
            onSignOut={signOut}
          />
        </HStack>
      </Container>
    </Box>
  );
};
