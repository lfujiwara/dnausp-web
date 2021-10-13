import { Box, HStack, Text } from "@chakra-ui/layout";

import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/react";
import { Input } from "@chakra-ui/input";
import { TSpreadsheetWorksheetSelector } from "../../hooks/useSpreadsheetWorksheetSelector";
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
          Digite o ID da planilha e clique no botão para carregar os metadados.
        </Text>
        <HStack align="center" spacing="2" py="4">
          <Input
            ref={ref}
            type="text"
            placeholder="ID da planilha"
            borderColor={isError ? "red.500" : undefined}
          />
          <Button
            onClick={() => loadSpreadsheetMetadata(ref.current?.value || "")}
            isLoading={isLoading}
          >
            Carregar
          </Button>
        </HStack>
      </div>
      {isLoaded && (
        <Box>
          <div>ID: {spreadsheetId}</div>
          <div>{spreadsheetMetadata?.title}</div>
          <select onChange={(evt) => setSelectedWorksheet(evt.target.value)}>
            {spreadsheetMetadata?.worksheets.map((worksheet) => (
              <option key={worksheet} value={worksheet}>
                {worksheet}
              </option>
            ))}
          </select>
        </Box>
      )}
    </Box>
  );
};
