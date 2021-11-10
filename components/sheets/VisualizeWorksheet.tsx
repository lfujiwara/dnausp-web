import {
  Alert,
  Box,
  Button,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { rowToObject } from "@common/row-to-object";
import { DefaultWorksheet } from "@sheets/defaults/default-worksheet";
import { Card } from "components/layout/elements/Card";
import { useWorksheetFetcher } from "hooks/useWorksheetFetcher";
import React, { useEffect } from "react";
import { LoadSheetDataAsDomain } from "./LoadSheetDataAsDomain";
import { FilterByFoundedInYearRangeWidget } from "./widgets/filter-by-founded-in-year-range-widget";
import { ValidatorWidget } from "./widgets/validator-widget";

export const VisualizeWorksheet = ({
  spreadsheetId,
  worksheet,
}: {
  spreadsheetId: string;
  worksheet: string;
}) => {
  const worksheetFetcher = useWorksheetFetcher();

  useEffect(() => {
    worksheetFetcher.reset();
  }, [spreadsheetId, worksheet]);

  const fetchData = () => worksheetFetcher.fetch(spreadsheetId, worksheet);

  return (
    <Card>
      <HStack alignItems="stretch">
        <Box flex="1">
          <Text fontSize="lg" fontWeight="medium">
            {worksheet}
          </Text>
          <Text>{spreadsheetId}</Text>
        </Box>
        <Button
          onClick={fetchData}
          isLoading={worksheetFetcher.isLoading}
          colorScheme="blue"
          height="unset"
        >
          Carregar dados
        </Button>
      </HStack>
      {worksheetFetcher.isError && (
        <Alert status="error">Erro ao carregar dados</Alert>
      )}
      {worksheetFetcher.isLoaded && (
        <Text mb="2">
          Planilha com {worksheetFetcher.data?.rows.length} linhas
        </Text>
      )}
      {worksheetFetcher.isLoaded && worksheetFetcher.data && (
        <Tabs>
          <TabList>
            <Tab>Validação</Tab>
            <Tab>Extração</Tab>
            <Tab>Mapeamento</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ValidatorWidget {...worksheetFetcher.data} />
            </TabPanel>
            <TabPanel>
              <FilterByFoundedInYearRangeWidget data={worksheetFetcher.data} />
            </TabPanel>
            <TabPanel>
              <LoadSheetDataAsDomain
                inputs={
                  worksheetFetcher.data.rows.map(
                    rowToObject(worksheetFetcher.data.header)
                  ) as DefaultWorksheet[]
                }
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </Card>
  );
};
