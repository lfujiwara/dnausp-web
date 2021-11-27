import { Box, Container, HStack } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/react";
import Image from "next/image";
import { BackendAuthButton } from "../auth/BackendAuthButton";
import { NavDrawer } from "./NavDrawer";

export const Header = () => {
  return (
    <Box borderBottomWidth="thin" borderBottomColor="gray.100">
      <Container maxW="container.lg">
        <HStack align="center">
          <NavDrawer />
          <Image alt="dnausp" src="/dnausp.svg" width="64" height="64" />
          <Heading color="gray.700" fontWeight="medium">
            Painel
          </Heading>
          <Box flex="1" />
          <BackendAuthButton />
        </HStack>
      </Container>
    </Box>
  );
};
