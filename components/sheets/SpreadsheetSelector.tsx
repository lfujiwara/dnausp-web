import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Box, HStack, Text } from "@chakra-ui/layout";

import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import { TSpreadsheetWorksheetSelector } from "../../hooks/useSpreadsheetWorksheetSelector";
import { parseSpreadsheetId } from "../../lib/sheets/parse-spreadsheet-id";
import { useRef } from "react";

export const SpreadsheetWorksheetSelector = ({
  isError,
  isLoaded,
  isLoading,
  loadSpreadsheetMetadata,
  spreadsheetId,
  spreadsheetMetadata,
  setSelectedWorksheet,
}: TSpreadsheetWorksheetSelector) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <Box shadow="md" p="4" rounded="md">
      <div>
        <Text>
          Digite o ID da planilha ou insira o link e clique no botão para
          carregar os metadados.
        </Text>
        <HStack align="center" spacing="2" py="4">
          <Input
            ref={ref}
            type="text"
            placeholder="ID ou URL da planilha"
            borderColor={isError ? "red.500" : undefined}
          />
          <Button
            onClick={() =>
              loadSpreadsheetMetadata(
                parseSpreadsheetId(ref.current?.value || "")
              )
            }
            isLoading={isLoading}
          >
            Carregar
          </Button>
        </HStack>
      </div>
      {isLoaded && (
        <Box>
          <Alert status="success" rounded="md">
            <AlertIcon />
            Metadados carregados com sucesso!
          </Alert>
          <Box pt="4">
            <Box mb="2">Selecione uma subplanilha para continuar:</Box>
            <Select onChange={(evt) => setSelectedWorksheet(evt.target.value)}>
              {spreadsheetMetadata?.worksheets.map((worksheet) => (
                <option key={worksheet} value={worksheet}>
                  {worksheet}
                </option>
              ))}
            </Select>
          </Box>
        </Box>
      )}
    </Box>
  );
};
