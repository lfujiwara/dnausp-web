import React from "react";
import { Link, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { Center, Text } from "@chakra-ui/layout";
import Head from "next/head";

export default function SheetsPage() {
  return (
    <>
      <Head>
        <title>Página inicial</title>
      </Head>
      <Center py="4">
        <VStack align="center">
          <Text>
            Você está logado, clique nos links para acessar os recursos.
          </Text>
          <VStack
            spacing="4"
            rounded="md"
            py="4"
            px="6"
            bgColor="gray.200"
            mt="4"
          >
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
        </VStack>
      </Center>
    </>
  );
}
