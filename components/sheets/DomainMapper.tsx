import { FC, useEffect, useState } from "react";
import { DefaultWorksheet } from "@sheets/defaults/default-worksheet";
import {
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import { mapEmpresa } from "../../lib/app/map-empresa";
import { EmpresasTable } from "../tables/EmpresasTable";
import { EmpresasErrorTable } from "../tables/EmpresasErrorTable";
import { useSendToBackendInBatch } from "../../backend/mutations/sendToBackendInBatch";
import { useLoadingState } from "../../hooks/useLoading";
import { Empresa } from "@dnausp/core";

type State = any;

export const DomainMapper: FC<{ inputs: DefaultWorksheet[] }> = ({
  inputs,
}) => {
  const [data, setData] = useState<State | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const map = async () => {
    try {
      setLoading(true);
      const results = await Promise.all(inputs.map(mapEmpresa));
      setData({
        ok: results.filter((result) => result.isOk()).map((r) => r.unwrap()),
        fail: results
          .filter((result) => result.isFail())
          .map((r) => r.unwrapFail()),
      });
    } finally {
      setLoading(false);
    }
  };

  const hookL = useLoadingState("stale");
  const hook = useSendToBackendInBatch();
  const toast = useToast();

  const onSend = () => {
    hookL.setLoading();
    hook(data.ok.map((r) => r.output))
      .then((v) => {
        const { okCount, errorCount, totalCount } = v;
        toast({
          title: "Dados enviados",
          description: `Sucesso: ${okCount}; Erro: ${errorCount}; Total: ${totalCount}`,
          status: "success",
        });
        return v;
      })
      .then(hookL.setLoaded)
      .catch(hookL.setError);
  };

  useEffect(() => {
    if (!data?.ok) return;
    const faturamentos = data.ok
      .map((r) => r.output)
      .map((e: Empresa) => e.historicoFaturamentos.valores)
      .flat();
    console.log(faturamentos);
    const mediaAno = (ano) => {
      const arr = faturamentos.filter((f) => f?.anoFiscal === ano);
      return arr.reduce((acc, cur) => acc + cur.valor, 0) / arr.length;
    };

    console.log(mediaAno(2018), mediaAno(2019), mediaAno(2020));
  }, [data]);

  return (
    <>
      <Box>
        <Button onClick={map} w="full" isLoading={loading}>
          Mapear
        </Button>
        {!!data && (
          <Button mt="2" w="full" isLoading={hookL.isLoading} onClick={onSend}>
            Enviar dados
          </Button>
        )}
      </Box>
      {!!data && !loading && (
        <>
          <Box h="4" />
          <Tabs>
            <TabList>
              <Tab>Sucesso ({data.ok.length})</Tab>
              <Tab>Erro ({data.fail.length})</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <EmpresasTable empresas={data.ok} />
              </TabPanel>
              <TabPanel>
                <EmpresasErrorTable results={data.fail} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      )}
    </>
  );
};
