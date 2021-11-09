import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Container,
  HStack,
  ScaleFade,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useGoogleAuthData } from "../auth/google/google-auth.context";
import { Card } from "../components/layout/elements/Card";
import { RequireGoogleLogin } from "../components/layout/RequireGoogleLogin";
import { SpreadsheetWorksheetSelector } from "../components/sheets/SpreadsheetSelector";
import { FilterByFoundedInYearRangeWidget } from "../components/sheets/widgets/filter-by-founded-in-year-range-widget";
import { ValidatorWidget } from "../components/sheets/widgets/validator-widget";
import { useSpreadsheetWorksheetSelector } from "../hooks/useSpreadsheetWorksheetSelector";
import { useWorksheetFetcher } from "../hooks/useWorksheetFetcher";

const VisualizeWorksheet = ({
  spreadsheetId,
  worksheet,
}: {
  spreadsheetId: string;
  worksheet: string;
}) => {
  const worksheetFetcher = useWorksheetFetcher();

  useEffect(() => {
    worksheetFetcher.reset();
  }, [spreadsheetId, worksheet]);

  const fetchData = () => worksheetFetcher.fetch(spreadsheetId, worksheet);

  return (
    <Card>
      <HStack alignItems="stretch">
        <Box flex="1">
          <Text fontSize="lg" fontWeight="medium">
            {worksheet}
          </Text>
          <Text>{spreadsheetId}</Text>
        </Box>
        <Button
          onClick={fetchData}
          isLoading={worksheetFetcher.isLoading}
          colorScheme="blue"
          height="unset"
        >
          Carregar dados
        </Button>
      </HStack>
      {worksheetFetcher.isError && (
        <Alert status="error">Erro ao carregar dados</Alert>
      )}
      {worksheetFetcher.isLoaded && (
        <Text mb="2">
          Planilha com {worksheetFetcher.data?.rows.length} linhas
        </Text>
      )}
      {worksheetFetcher.isLoaded && worksheetFetcher.data && (
        <Tabs>
          <TabList>
            <Tab>Validação</Tab>
            <Tab>Extração</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ValidatorWidget {...worksheetFetcher.data} />
            </TabPanel>
            <TabPanel>
              <FilterByFoundedInYearRangeWidget data={worksheetFetcher.data} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </Card>
  );
};

const Logado = () => {
  const spreadsheetWorksheetSelector = useSpreadsheetWorksheetSelector();
  const { spreadsheetId, selectedWorksheet, isLoaded } =
    spreadsheetWorksheetSelector;
  return (
    <div>
      <SpreadsheetWorksheetSelector {...spreadsheetWorksheetSelector} />
      {isLoaded && spreadsheetId && selectedWorksheet && (
        <VisualizeWorksheet
          spreadsheetId={spreadsheetId}
          worksheet={selectedWorksheet}
        />
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
