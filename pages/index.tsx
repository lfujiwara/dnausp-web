import { useEffect, useState } from "react";

import { GoogleSheetsConstants } from "../constants/google-sheets.constants";
import { SpreadsheetWorksheetSelector } from "../components/sheets/SpreadsheetSelector";
import { fetchWorksheet } from "../lib/sheets/fetch-worksheet";
import { useGoogleAuthManager } from "../auth/google/google-auth.context";
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
  const { data } = useGoogleAuthManager();

  const spreadsheetWorksheetSelector = useSpreadsheetWorksheetSelector();
  const { spreadsheetId, selectedWorksheet, isLoaded } =
    spreadsheetWorksheetSelector;
  const worksheetFetcher = useWorksheetFetcher();

  return (
    <div>
      <p>Olá, {data.profile.name}, você está logado.</p>
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

const Carregando = () => {
  return <div>Carregando...</div>;
};

const Error = () => {
  return <div>Erro ao carregar</div>;
};

export default function SheetsPage() {
  const { isError, isLoading, isSignedIn } = useGoogleAuthManager();

  return (
    <>
      {isSignedIn && <Logado />}
      {!isSignedIn && <Login />}
      {isLoading && <Carregando />}
      {isError && <Error />}
    </>
  );
}
