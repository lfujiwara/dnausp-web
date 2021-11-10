import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Box, HStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { ReportedValue } from "@common/report";
import { TResult } from "@common/result";
import { IEmpresa } from "@domain/entities/empresa";
import { DefaultWorksheet } from "@sheets/defaults/default-worksheet";
import { downloadTextAsCSVFile } from "@sheets/download-text-to-csv";
import { empresaMapper } from "@sheets/mappers/empresa-mapper";
import { DownloadCSVFromObjectArray } from "components/misc/DownloadCSVFromObjectArray";
import { useUpsertEmpresa } from "hooks/useUpsertEmpresa";
import { unparse } from "papaparse";
import { FC, useState } from "react";
import { FaCloud, FaFileDownload } from "react-icons/fa";

const InnerCard = ({
  label,
  quantity,
  data,
}: {
  label: string;
  quantity: number;
  data: any[];
}) => {
  const api = useUpsertEmpresa();
  const toast = useToast();
  const send = () => {
    api(data)
      .then((res) => {
        const count = res?.ok?.length;
        if (count)
          toast({
            title: `${count} empresas adicionadas/atualizadas`,
            status: "success",
          });
        else
          toast({
            title: `Algo estranho aconteceu.`,
            status: "warning",
          });
      })
      .catch(() => {
        toast({
          title: `Ocorreu um erro.`,
          status: "error",
        });
      });
  };

  return (
    <Box w="32" rounded="md" p="2" shadow="md">
      <Box fontWeight="bold" textAlign="left">
        {label}
      </Box>
      <Box fontWeight="semibold" textAlign="right">
        {quantity}
      </Box>
      <Button
        variantColor="green"
        w="full"
        mt="2"
        onClick={() => downloadTextAsCSVFile(unparse(data, { header: true }))}
      >
        <Icon as={FaFileDownload} mr="2" /> Baixar
      </Button>
      {label === "Mapeadas" && (
        <Button variantColor="green" w="full" mt="2" onClick={send}>
          <Icon as={FaCloud} mr="2" /> Enviar
        </Button>
      )}
    </Box>
  );
};

export const LoadSheetDataAsDomain: FC<{ inputs: DefaultWorksheet[] }> = ({
  inputs,
}) => {
  const [results, setResults] = useState<
    TResult<ReportedValue<IEmpresa>, ReportedValue<DefaultWorksheet>>[]
  >([]);

  const execute = () => {
    const _results = inputs.map(empresaMapper);
    setResults(_results);
  };

  const okCount = results.filter((r) => r.isOk()).length;
  const errCount = results.length - okCount;

  const extractValue = ({ value, warns, errors }: ReportedValue<any>) => {
    return {
      warns,
      errors,
      ...value,
    };
  };

  const ok = results
    .filter((r) => r.isOk())
    .map((x) => x.value)
    .map(extractValue);
  const err = results
    .filter((r) => r.isErr())
    .map((x) => x.value)
    .map(extractValue);

  return (
    <Box>
      <Button onClick={execute}>Executar validação</Button>
      <HStack spacing="4" pt="4" align="stretch">
        <InnerCard data={ok} label="Mapeadas" quantity={okCount} />
        <InnerCard data={err} label="Erros" quantity={errCount} />
      </HStack>
    </Box>
  );
};
