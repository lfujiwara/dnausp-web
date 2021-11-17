import { Container } from "@chakra-ui/react";
import { VisualizeWorksheet } from "components/sheets/VisualizeWorksheet";
import React from "react";
import { RequireGoogleLogin } from "../components/layout/RequireGoogleLogin";
import { SpreadsheetWorksheetSelector } from "../components/sheets/SpreadsheetSelector";
import { useSpreadsheetWorksheetSelector } from "../hooks/useSpreadsheetWorksheetSelector";

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
  return (
    <RequireGoogleLogin>
      <InnerPage />
    </RequireGoogleLogin>
  );
}
