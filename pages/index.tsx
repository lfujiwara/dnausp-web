import { Container } from "@chakra-ui/react";
import { VisualizeWorksheet } from "components/sheets/VisualizeWorksheet";
import React from "react";
import { SpreadsheetWorksheetSelector } from "../components/sheets/SpreadsheetSelector";
import { useSpreadsheetWorksheetSelector } from "../hooks/useSpreadsheetWorksheetSelector";
import { Box } from "@chakra-ui/layout";

const Logado = () => {
  const spreadsheetWorksheetSelector = useSpreadsheetWorksheetSelector();
  const { spreadsheetId, selectedWorksheet, isLoaded } =
    spreadsheetWorksheetSelector;
  return (
    <div>
      <SpreadsheetWorksheetSelector {...spreadsheetWorksheetSelector} />
      {isLoaded && spreadsheetId && selectedWorksheet && (
        <>
          <VisualizeWorksheet
            spreadsheetId={spreadsheetId}
            worksheet={selectedWorksheet}
          />
        </>
      )}
    </div>
  );
};

const InnerPage = () => {
  return (
    <Container py="6">
      <Logado />
    </Container>
  );
};

export default function SheetsPage() {
  return <Box>Em construção</Box>;
}
