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
  return <div>Olá, {data.profile.name}, você está logado.</div>;
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
