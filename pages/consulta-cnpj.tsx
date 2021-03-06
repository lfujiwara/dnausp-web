import { Box, HStack, Text } from "@chakra-ui/layout";
import { EventHandler, useRef, useState } from "react";
import {
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import Head from "next/head";

const RenderValue = ({
  label,
  value,
  level = 0,
}: {
  label: string;
  value: any;
  level?: number;
}) => {
  const border = {
    py: "2",
    borderWidth: "1px",
    borderColor: "gray.300",
  };

  if (!!value && typeof value === "object") {
    return (
      <>
        <Box spacing="2" p="2" {...border}>
          <Text>{label}</Text>
          <Box m="2">
            {Object.entries(value).map(([key, val]) => (
              <RenderValue key={key} label={key} value={val} />
            ))}
          </Box>
        </Box>
      </>
    );
  }
  return (
    <HStack spacing="2" ml={level} align="center" p="2" {...border}>
      <Text>{label}</Text>
      <Text>{value || "N/D"}</Text>
    </HStack>
  );
};

export default function ConsultaCnpjPage() {
  const ref = useRef<HTMLInputElement>(null);
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const handleSubmit: EventHandler<any> = (evt) => {
    const actualCNPJ = (ref.current?.value + "").replace(/\D/g, "");
    if (validateCNPJ(actualCNPJ)) {
      setIsLoading(true);
      fetch(`https://brasilapi.com.br/api/cnpj/v1/${actualCNPJ}`)
        .then((res) => res.json())
        .then((res) => {
          setIsLoading(false);
          setData(res);
          setIsError("");
        })
        .catch(() => {
          setIsLoading(false);
          setIsError("servidor");
        });
    } else setIsError("cnpj");

    evt.preventDefault();
  };

  return (
    <>
      <Head>
        <title>Consulta CNPJ</title>
      </Head>
      <Center py="4">
        <Box p="4" w="full" maxW="container.sm">
          <Text fontSize="xl" fontWeight="bold">
            Consulta CNPJ
          </Text>
          <form onSubmit={handleSubmit}>
            <FormControl id="cnpj" isInvalid={!!isError}>
              <FormLabel>CNPJ</FormLabel>
              <Input isInvalid={!!isError} type="text" ref={ref} />
              {isError.toLowerCase() === "cnpj" && (
                <FormErrorMessage>CNPJ inv??lido</FormErrorMessage>
              )}
              {isError.toLowerCase() === "servidor" && (
                <FormErrorMessage>Erro ao consultar servidor</FormErrorMessage>
              )}
              <Button
                mt="2"
                colorScheme="blue"
                w="full"
                type="submit"
                isLoading={isLoading}
              >
                Pesquisar
              </Button>
            </FormControl>
          </form>
          {data && !isError && (
            <Box my="2">
              {Object.entries(data).map(([key, val]) => (
                <RenderValue key={key} label={key} value={val} />
              ))}
            </Box>
          )}
        </Box>
      </Center>
    </>
  );
}

const validateCNPJ = (cnpj: string) => {
  cnpj = cnpj.replace(/[^\d]+/g, "");

  if (cnpj === "") return false;

  if (cnpj.length !== 14) return false;

  // Elimina CNPJs invalidos conhecidos
  if (
    cnpj === "00000000000000" ||
    cnpj === "11111111111111" ||
    cnpj === "22222222222222" ||
    cnpj === "33333333333333" ||
    cnpj === "44444444444444" ||
    cnpj === "55555555555555" ||
    cnpj === "66666666666666" ||
    cnpj === "77777777777777" ||
    cnpj === "88888888888888" ||
    cnpj === "99999999999999"
  )
    return false;

  // Valida DVs
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros[tamanho - i]) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== Number(digitos.charAt(0))) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros[tamanho - i]) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  return resultado === Number(digitos.charAt(1));
};
