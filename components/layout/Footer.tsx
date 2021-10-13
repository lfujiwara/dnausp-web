import { Box, Center, Heading, Link, Text } from "@chakra-ui/layout";

export const Footer = () => {
  return (
    <Box borderTopWidth="thin" borderTopColor="gray.100" p="4">
      <Center>
        <Text fontWeight="semibold" textAlign="center">
          Trabalho realizado para a disciplina{" "}
          <Link href="https://www.ime.usp.br/~nina/mac0499">MAC0499</Link>{" "}
          (IME-USP) - Trabalho de Formatura Supervisionado
        </Text>
      </Center>
    </Box>
  );
};
