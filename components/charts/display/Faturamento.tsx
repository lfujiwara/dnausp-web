import { useState } from "react";
import { FilterEmpresa } from "@dnausp/core";
import { useFaturamentoQuery } from "../../../backend/queries/all-queries";
import { AccordionHelper } from "../AccordionHelper";
import { EmpresaFilter } from "../EmpresaFilter";
import { Container } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import { ResponsiveBar } from "@nivo/bar";

const formatter = Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const Faturamento = () => {
  const [filter, setFilter] = useState<FilterEmpresa>({});
  const fatQuery = useFaturamentoQuery(filter);

  return (
    <>
      <Box w="full" h="60vh" maxH="100vh">
        <ResponsiveBar
          data={
            fatQuery.data?.map((v) => ({ ...v, valor: v.valor / 100 })) || []
          }
          keys={["valor"]}
          indexBy="ano"
          label={(d) => formatter.format(d.data.valor)}
          margin={{ top: 50, right: 50, bottom: 50, left: 100 }}
          colors={{ scheme: "nivo" }}
          isInteractive
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Ano fiscal",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Faturamento (média R$)",
            legendPosition: "middle",
            legendOffset: 0,
            renderTick: ({ y }) => <></>,
          }}
        />
      </Box>
      <Container pb="4">
        <AccordionHelper
          content={[
            {
              label: "Filtrar empresas contidas na análise",
              content: (
                <EmpresaFilter
                  onApply={(f) => setFilter(f)}
                  isLoading={fatQuery.isLoading}
                />
              ),
            },
          ]}
        />
      </Container>
    </>
  );
};
