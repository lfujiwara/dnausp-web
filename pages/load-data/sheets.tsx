import { RequireBackendAuth } from "@auth/backend/require-backend-auth";
import { GAPIAuthContextProvider } from "@auth/gapi/GAPIAuthContext";
import { useState } from "react";
import { Container } from "@chakra-ui/layout";
import { SpreadsheetSelectorV2 } from "../../components/sheets/SpreadsheetSelectorV2";
import { WorksheetData } from "@sheets/sheet";
import { VisualizeWorksheetV2 } from "../../components/sheets/VisualizeWorksheetV2";
import { Card } from "../../components/layout/elements/Card";
import { Box } from "@chakra-ui/react";
import Head from "next/head";

function Sheets() {
  const [worksheetData, setWorksheetData] = useState<
    WorksheetData | undefined
  >();

  return (
    <Container maxW="container.lg" p="4">
      <Card>
        <SpreadsheetSelectorV2
          worksheetData={worksheetData}
          setWorksheetData={setWorksheetData}
        />
        <Box h="2" />
        <VisualizeWorksheetV2 worksheetData={worksheetData} />
      </Card>
    </Container>
  );
}

export default function WrappedSheetV2() {
  return (
    <>
      <Head>
        <title>Carregar dados (Google Sheets)</title>
      </Head>
      <RequireBackendAuth>
        <GAPIAuthContextProvider>
          <Sheets />
        </GAPIAuthContextProvider>
      </RequireBackendAuth>
    </>
  );
}
