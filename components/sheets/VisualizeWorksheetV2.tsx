import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { rowToObject } from "@common/row-to-object";
import { DefaultWorksheet } from "@sheets/defaults/default-worksheet";
import React from "react";
import { FilterByFoundedInYearRangeWidget } from "./widgets/filter-by-founded-in-year-range-widget";
import { ValidatorWidget } from "./widgets/validator-widget";
import { WorksheetData } from "@sheets/sheet";
import { DomainMapper } from "./DomainMapper";

export const VisualizeWorksheetV2 = ({
  worksheetData,
}: {
  worksheetData?: WorksheetData;
}) => {
  return (
    <Box>
      {worksheetData && (
        <Tabs>
          <TabList>
            <Tab>Validação</Tab>
            <Tab>Extração</Tab>
            <Tab>Mapeamento</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ValidatorWidget {...worksheetData} />
            </TabPanel>
            <TabPanel>
              <FilterByFoundedInYearRangeWidget data={worksheetData} />
            </TabPanel>
            <TabPanel>
              <DomainMapper
                inputs={
                  worksheetData.rows.map(
                    rowToObject(worksheetData.header)
                  ) as DefaultWorksheet[]
                }
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </Box>
  );
};
