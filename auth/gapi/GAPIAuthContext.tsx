import { createContext, FC, useContext, useState } from "react";
import { CircularProgress, useToast } from "@chakra-ui/react";
import GoogleLogin from "react-google-login";
import { Center } from "@chakra-ui/layout";

const scope = [
  "profile",
  "email",
  "https://www.googleapis.com/auth/spreadsheets.readonly",
].join(" ");

export interface IGAPIAuthContext {
  accessToken: string;
  email: string;
  name: string;
}

export const GAPIAuthContext = createContext<IGAPIAuthContext | undefined>(
  undefined
);

type useStateOf<T> = [T, (value: T) => void];
export const GAPIAuthStateContext = createContext<
  useStateOf<IGAPIAuthContext | undefined>
>([undefined, () => undefined]);

/**
 * Este hook apenas deve ser utilizado sob um GAPIAuthContextProvider
 */
export const useGAPIContext = () =>
  useContext(GAPIAuthContext) as IGAPIAuthContext;

export const GAPIAuthStateContextProvider: FC = ({ children }) => {
  const ctxState = useState<IGAPIAuthContext | undefined>(undefined);

  return (
    <GAPIAuthStateContext.Provider value={ctxState}>
      {children}
    </GAPIAuthStateContext.Provider>
  );
};

export const GAPIAuthContextProvider: FC<any> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  const [ctx, setCtx] = useContext(GAPIAuthStateContext);
  const toast = useToast();

  const handleGoogleLogin = (token: any) => {
    try {
      const shouldToast = ctx?.accessToken !== token.accessToken;

      setCtx({
        accessToken: token.accessToken,
        name: token.profileObj.name,
        email: token.profileObj.email,
      });
      stopLoading();

      if (shouldToast)
        toast({
          title: "Success",
          description: "Login com Google APIs feito com sucesso",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
    } catch (err) {
      handleLoginError(err);
    }
  };

  const handleLoginError = (err: any) => {
    toast({
      title: "Erro ao logar com Google APIs",
      description: err?.error,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    stopLoading();
  };

  if (!ctx) {
    return (
      <Center py="8">
        {loading && <CircularProgress isIndeterminate />}
        {!loading && (
          <GoogleLogin
            scope={scope}
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID + ""}
            buttonText="Faça login com Google APIs para continuar."
            onSuccess={handleGoogleLogin}
            onFailure={handleLoginError}
            onRequest={startLoading}
            isSignedIn
          />
        )}
      </Center>
    );
  }

  return (
    <GAPIAuthContext.Provider value={ctx}>{children}</GAPIAuthContext.Provider>
  );
};
