import { Box, Container, Heading } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { CNAEChart } from "../components/charts/CNAEChart";
import { FilterAggregate } from "../components/charts/filters/filter-aggregate";
import { WrapRequireBackendAuth } from "@auth/backend/require-backend-auth";
import {
  CNAEClassifier,
  CNAEClassifiers,
} from "../components/charts/classifiers/cnae-classifiers";
import { Center, Text, VStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { useCNAEStatsQuery } from "../backend/queries/CNAEStatsQuery";
import Head from "next/head";

function SelectCNAEClassifier(props: {
  onChange: (evt: ChangeEvent<HTMLSelectElement>) => void;
  groupMethod: {
    name: string;
    classifier: CNAEClassifier;
    labels: { [p: string]: string | undefined };
  };
}) {
  return (
    <Select onChange={props.onChange} value={props.groupMethod.name} w="full">
      {CNAEClassifiers.map((method) => (
        <option key={method.name} value={method.name}>
          {method.name}
        </option>
      ))}
    </Select>
  );
}

function DashboardPage() {
  const [filter, setFilter] = useState<any>({});
  const onApply = (newFilter: any) => {
    setFilter({ ...filter, ...newFilter });
  };

  const [groupMethod, setGroupMethod] = useState(CNAEClassifiers[0]);
  const handleGroupMethodChange = (evt: ChangeEvent<HTMLSelectElement>) =>
    setGroupMethod(
      CNAEClassifiers.find((g) => g.name === evt.target.value) ||
        CNAEClassifiers[0]
    );

  const query = useCNAEStatsQuery(filter);

  return (
    <>
      <Head>
        <title>Relatório</title>
      </Head>
      <Box p="2">
        <Center maxW="100vw">
          <Container maxW="container.md">
            <Heading>Distribuição CNAE - Empresas DNA USP</Heading>
          </Container>
        </Center>
        <CNAEChart
          data={query.data || []}
          groupByFunction={(x) => groupMethod.classifier(x.cnae)}
          groupLabels={groupMethod.labels}
        />
        <Center maxW="100vw">
          <Container maxW="container.md">
            <VStack spacing="2">
              <Box w="full">
                <Text fontSize="xl" mb="2" fontWeight="medium">
                  Filtrar
                </Text>
                <SelectCNAEClassifier
                  onChange={handleGroupMethodChange}
                  groupMethod={groupMethod}
                />
              </Box>
              <FilterAggregate boxProps={{ w: "full" }} onApply={onApply} />
            </VStack>
          </Container>
        </Center>
      </Box>
    </>
  );
}

const DashboardPageWrapped = WrapRequireBackendAuth(DashboardPage);
export default DashboardPageWrapped;
