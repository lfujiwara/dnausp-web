import { FC, useState } from "react";
import { DefaultWorksheet } from "@sheets/defaults/default-worksheet";
import {
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { mapEmpresa, MapEmpresaValue } from "../../lib/app/map-empresa";
import { EmpresasTable } from "../tables/EmpresasTable";
import { EmpresasErrorTable } from "../tables/EmpresasErrorTable";

type MappedResult<T> = {
  input: DefaultWorksheet;
  output: T;
};

type OkResult = MappedResult<MapEmpresaValue>;
type FailResult = MappedResult<string[]>;

type State = {
  ok: OkResult[];
  fail: FailResult[];
};

export const DomainMapper: FC<{ inputs: DefaultWorksheet[] }> = ({
  inputs,
}) => {
  const [data, setData] = useState<State | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const map = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const results = await Promise.all(
        inputs.map(async (input) => ({
          input,
          output: await mapEmpresa(input),
        }))
      );
      setData({
        ok: results
          .filter((result) => result.output.isOk())
          .map((r) => ({ ...r, output: r.output.unwrap() })),
        fail: results
          .filter((result) => result.output.isFail())
          .map((r) => ({ ...r, output: r.output.unwrapFail() })),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box>
        <Button onClick={map} w="full" isLoading={loading}>
          Mapear
        </Button>
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
                <EmpresasTable empresas={data.ok.map((r) => r.output)} />
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
