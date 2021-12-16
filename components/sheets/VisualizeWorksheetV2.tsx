import { Box } from "@chakra-ui/react";
import { rowToObject } from "@common/row-to-object";
import { DefaultWorksheet } from "@sheets/defaults/default-worksheet";
import React from "react";
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
        <DomainMapper
          inputs={
            worksheetData.rows.map(
              rowToObject(worksheetData.header)
            ) as DefaultWorksheet[]
          }
        />
      )}
    </Box>
  );
};
