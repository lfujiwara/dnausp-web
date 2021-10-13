import { Box, Container } from "@chakra-ui/react";
import {
  useGoogleAuthData,
  useGoogleAuthManager,
} from "../auth/google/google-auth.context";

import { RequireGoogleLogin } from "../components/layout/RequireGoogleLogin";
import { SpreadsheetWorksheetSelector } from "../components/sheets/SpreadsheetSelector";
import { useSpreadsheetWorksheetSelector } from "../hooks/useSpreadsheetWorksheetSelector";
import { useWorksheetFetcher } from "../hooks/useWorksheetFetcher";

const Login = () => {
  const { signIn, isAuthLoaded } = useGoogleAuthManager();
  return (
    <div>
      <button disabled={!isAuthLoaded} onClick={signIn}>
        Login
      </button>
    </div>
  );
};

const Logado = () => {
  const spreadsheetWorksheetSelector = useSpreadsheetWorksheetSelector();
  const { spreadsheetId, selectedWorksheet, isLoaded } =
    spreadsheetWorksheetSelector;
  const worksheetFetcher = useWorksheetFetcher();

  return (
    <div>
      <SpreadsheetWorksheetSelector {...spreadsheetWorksheetSelector} />
      {isLoaded && spreadsheetId && selectedWorksheet && (
        <div>
          <p>
            Você está visualizando a planilha: {spreadsheetId} -{" "}
            {selectedWorksheet}
          </p>
          <button
            onClick={() =>
              worksheetFetcher.fetch(spreadsheetId, selectedWorksheet)
            }
          >
            Fetch Worksheet
          </button>
          {worksheetFetcher.isLoading && (
            <div>Carregando dados da planilha...</div>
          )}
          {worksheetFetcher.isLoaded && (
            <div>Planilha com {worksheetFetcher.data?.rows.length} linhas</div>
          )}
        </div>
      )}
    </div>
  );
};

const GreetingHoc = () => {
  const {
    profile: { givenName },
  } = useGoogleAuthData();

  return <Greeting name={givenName} />;
};

const Greeting = ({ name }: { name: string }) => {
  return (
    <Box textAlign="center">
      Olá, {name}, você entrou com sua conta Google com sucesso.
    </Box>
  );
};

const InnerPage = () => {
  return (
    <Container py="6">
      <GreetingHoc />
      <Logado />
    </Container>
  );
};

export default function SheetsPage() {
  const { isError, isLoading, isSignedIn } = useGoogleAuthManager();

  return (
    <RequireGoogleLogin>
      <InnerPage />
    </RequireGoogleLogin>
  );
}
