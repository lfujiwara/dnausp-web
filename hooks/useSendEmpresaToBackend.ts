import { useAxios } from "./axios";
import { useMutation } from "react-query";
import { Empresa } from "@dnausp/core";
import { EmpresaJsonSerializer } from "../lib/serializers/json/empresa.json-serializer";
import { useToast } from "@chakra-ui/react";

export const useSendEmpresaToBackend = () => {
  const axios = useAxios();
  const toast = useToast();

  return useMutation(
    async (empresa: Empresa) =>
      axios
        .put("/empresas", EmpresaJsonSerializer.serialize(empresa))
        .then((res) => res.data),
    {
      onSuccess: () => {
        toast({
          title: "Empresa enviada com sucesso!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
      onError: () => {
        toast({
          title: "Erro ao enviar empresa!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    }
  );
};
