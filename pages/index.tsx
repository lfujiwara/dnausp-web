import {
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Container,
  ScaleFade,
  useDisclosure,
} from "@chakra-ui/react";
import { VisualizeWorksheet } from "components/sheets/VisualizeWorksheet";
import React from "react";
import { useGoogleAuthData } from "../auth/google/google-auth.context";
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

const GreetingHoc = () => {
  const {
    profile: { givenName },
  } = useGoogleAuthData();

  return <Greeting name={givenName} />;
};

const Greeting = ({ name }: { name: string }) => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  return (
    <ScaleFade in={isOpen}>
      <Alert status="success" rounded="md" position="absolute" width="auto">
        <AlertIcon />
        <AlertTitle mr={2}>
          Olá, {name}. Você entrou com sua conta Google com sucesso.
        </AlertTitle>
        <CloseButton onClick={onClose} />
      </Alert>
    </ScaleFade>
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
  return (
    <RequireGoogleLogin>
      <InnerPage />
    </RequireGoogleLogin>
  );
}
