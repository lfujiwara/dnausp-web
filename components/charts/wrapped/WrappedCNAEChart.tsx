import { useState } from "react";
import { useCNAEStatsQuery } from "../../../backend/queries/CNAEStatsQuery";
import { Box, Container, Heading } from "@chakra-ui/react";
import { Center } from "@chakra-ui/layout";
import { FilterAggregate } from "../filters/filter-aggregate";
import { WrappedCNAEChartFun } from "./WrappedCNAEChartFun";

export function WrappedCNAEChart() {
  const [filter, setFilter] = useState<any>({});
  const onApply = (newFilter: any) => {
    setFilter({ ...filter, ...newFilter });
  };

  const query = useCNAEStatsQuery(filter);

  return (
    <Box p="2">
      <Center maxW="100vw">
        <Container maxW="container.md">
          <Heading>Distribuição CNAE - Empresas DNA USP</Heading>
        </Container>
      </Center>
      <WrappedCNAEChartFun data={query.data || []} isLoading={query.isLoading}>
        <FilterAggregate boxProps={{ w: "full", mt: 4 }} onApply={onApply} />
      </WrappedCNAEChartFun>
    </Box>
  );
}
