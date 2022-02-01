import { FilterEmpresa } from "@dnausp/core";
import { Box } from "@chakra-ui/react";
import { ResponsivePie } from "@nivo/pie";
import { cnaeLabeler } from "@domain/util/cnae-labeler";
import { useState } from "react";
import { useDistribuicaoCnaeQuery } from "../../../backend/queries/all-queries";
import { useGroupCnaeDistribution } from "../../../hooks/useGroupCnae";
import { EmpresaFilter } from "../EmpresaFilter";
import { CnaeGroupingLevel } from "@domain/util/cnae-grouper";
import { AccordionHelper } from "../AccordionHelper";
import { CnaeGroupLevelSelect } from "../CnaeGroupLevelSelect";
import { Container, Text } from "@chakra-ui/layout";

export const DistribuicaoCNAEDisplay = () => {
  const [filter, setFilter] = useState<FilterEmpresa>({});
  const query = useDistribuicaoCnaeQuery(filter);
  const { data, level, setLevel } = useGroupCnaeDistribution(
    query.data?.data || {}
  );

  const chartData = Object.entries(data).map(([id, value]) => ({
    value,
    id,
    label: `${id} - ${cnaeLabeler(id)}`,
  }));

  return (
    <Box>
      <Box w="full" h="60vh" maxH="100vh">
        <ResponsivePie
          data={chartData}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
          id={(arc) => arc.label}
        />
      </Box>
      <Container pb="4">
        {query.data && (
          <Text mb="2">
            Exibindo dados de <strong>{query.data?.count}</strong> empresas
          </Text>
        )}
        <AccordionHelper
          content={[
            {
              label: "Filtrar empresas contidas na análise",
              content: (
                <EmpresaFilter
                  onApply={(f) => setFilter(f)}
                  isLoading={query.isLoading}
                />
              ),
            },
            {
              label: "Agrupamento CNAE",
              content: (
                <CnaeGroupLevelSelect
                  value={level}
                  onChange={(evt) =>
                    setLevel((evt.target.value + "") as CnaeGroupingLevel)
                  }
                />
              ),
            },
          ]}
        />
      </Container>
    </Box>
  );
};
