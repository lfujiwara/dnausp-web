import React from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Link,
  VStack,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import NextLink from "next/link";

export function NavDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.createRef<HTMLButtonElement>();

  return (
    <>
      <IconButton
        aria-label="nav"
        icon={<GiHamburgerMenu />}
        ref={btnRef}
        onClick={onOpen}
        mr="2"
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Páginas</DrawerHeader>
          <DrawerBody>
            <VStack spacing="4">
              <Link as="span">
                <NextLink href="/">Home</NextLink>
              </Link>
              <Link as="span">
                <NextLink href="/load-data/sheets">
                  Carregar dados (Google Sheets)
                </NextLink>
              </Link>
              <Link as="span">
                <NextLink href="/report">Relatórios</NextLink>
              </Link>
              <Link as="span">
                <NextLink href="/consulta-cnpj">Consulta CNPJ</NextLink>
              </Link>
              <Link as="span">
                <NextLink href="/mapa">Mapa</NextLink>
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
