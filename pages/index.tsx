import { useEffect, useState } from "react";

import { GoogleSheetsConstants } from "../constants/google-sheets.constants";
import { fetchSheet } from "../lib/sheets/fetch-sheet";
import { useGoogleAuthManager } from "../auth/google/google-auth.context";

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
  const [state, setState] = useState<any>(undefined);
  useEffect(() => {
    fetchSheet(
      GoogleSheetsConstants.defaultSheetId,
      GoogleSheetsConstants.defaultWorksheetId,
      data.accessToken
    ).then((r) =>
      setState({
        length: r.rows.length,
      })
    );
  }, []);
  return (
    <div>
      <p>Olá, {data.profile.name}, você está logado.</p>
      {state ? (
        <p>Planilha com {state.length} registros.</p>
      ) : (
        <p>Carregando planilha...</p>
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
