import { SpreadsheetMetadata } from "@sheets/spreadsheet-metadata";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useToast } from "@chakra-ui/toast";
import { useFetchSpreadSheetMetadata } from "../../hooks/useFetchSpreadSheetMetadata";
import { useSheetPreferences } from "../../hooks/useSheetPreferences";
import { parseSpreadsheetId } from "@sheets/parse-spreadsheet-id";
import { FormControl, FormLabel, Stack, VStack } from "@chakra-ui/react";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { WorksheetData } from "@sheets/sheet";
import { Select } from "@chakra-ui/select";
import { useFetchWorksheetData } from "../../hooks/useFetchWorksheetData";

const useLoad = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  return {
    isLoading: loading,
    isError: error,
    startLoading: () => setLoading(true),
    stopLoading: () => setLoading(false),
    setError: (err = "Erro") => setError(err),
    clearError: () => setError(""),
  };
};

export const SpreadsheetSelectorV2 = ({
                                        setWorksheetData,
                                      }: {
  setWorksheetData: (worksheetData: WorksheetData) => any;
}) => {
  const [spreadsheet, setSpreadsheet] = useState<SpreadsheetMetadata | undefined>();

  const spreadsheetLoad = useLoad();
  const worksheetLoad = useLoad();

  const spreadsheetIdRef = useRef<HTMLInputElement>(null);
  const worksheetIdRef = useRef<HTMLSelectElement>(null);
  const toast = useToast({
    id: "spreadsheet-selector",
  });
  const fetchSpreadsheetMetadata = useFetchSpreadSheetMetadata();
  const fetchWorksheetData = useFetchWorksheetData();
  const p = useSheetPreferences();

  const handleSpreadsheetMetadata = (data: SpreadsheetMetadata) => {
    setSpreadsheet(data);
    p.setSpreadsheet(data.id);
    spreadsheetLoad.stopLoading();
  };
  const handleSpreadsheetMetadataError = (err: any) => {
    toast({
      title: "Erro ao carregar metadados da planilha",
      status: "error",
      description: err + "",
    });
  };
  const onSubmitSpreadsheetId = (evt?: ChangeEvent<HTMLFormElement>) => {
    evt?.preventDefault();
    if (!spreadsheetIdRef.current || !spreadsheetIdRef.current?.value) return;
    const value = parseSpreadsheetId(spreadsheetIdRef.current.value.trim());
    spreadsheetLoad.startLoading();
    fetchSpreadsheetMetadata(value)
      .then(handleSpreadsheetMetadata)
      .catch(handleSpreadsheetMetadataError)
      .finally(spreadsheetLoad.stopLoading);
  };

  const handleWorksheetData = (data: WorksheetData) => {
    p.setSheet(worksheetIdRef.current?.value + "");
    setWorksheetData(data);
  };
  const handleWorksheetDataError = (err: any) => {
    toast({
      title: "Erro ao carregar dados da planilha",
      status: "error",
      description: err + "",
    });
  };
  const onSubmitWorksheetId = (evt?: ChangeEvent<HTMLFormElement>) => {
    evt?.preventDefault();
    if (
      !worksheetIdRef.current ||
      !worksheetIdRef.current?.value ||
      !spreadsheet
    )
      return;
    const worksheetId = worksheetIdRef.current.value.trim();
    worksheetLoad.startLoading();
    fetchWorksheetData(spreadsheet.id, worksheetId)
      .then(handleWorksheetData)
      .catch(handleWorksheetDataError)
      .finally(worksheetLoad.stopLoading);
  };

  const fetchWorksheetFromLocalStorage = () => {
    const value = p.getSheet();
    if (!worksheetIdRef.current || !value) return;
    worksheetIdRef.current.value = value;
    onSubmitWorksheetId();
  };

  const fetchSpreadsheetFromLocalStorage = () => {
    const value = p.getSpreadsheet();
    if (!spreadsheetIdRef.current || !value) return;
    spreadsheetIdRef.current.value = value;
    onSubmitSpreadsheetId();
  };

  useEffect(() => {
    fetchSpreadsheetFromLocalStorage();
  }, []);

  useEffect(() => {
    fetchWorksheetFromLocalStorage();
  }, [spreadsheet]);

  return (
    <VStack spacing="2" align="stretch">
      <Stack
        spacing={[2, 2, 4]}
        direction={["column", "row"]}
        align={["stretch", "flex-end"]}
      >
        <FormControl id="email" isDisabled={spreadsheetLoad.isLoading}>
          <FormLabel>Link ou ID da planilha no Google Docs</FormLabel>
          <Input ref={spreadsheetIdRef}/>
        </FormControl>
        <Button
          onClick={() => onSubmitSpreadsheetId()}
          isLoading={spreadsheetLoad.isLoading}
        >
          Carregar
        </Button>
      </Stack>
      <Stack
        spacing={[2, 2, 4]}
        direction={["column", "row"]}
        align={["stretch", "flex-end"]}
      >
        <FormControl
          id="email"
          isDisabled={
            !spreadsheet || worksheetLoad.isLoading || spreadsheetLoad.isLoading
          }
        >
          <FormLabel>Subplanilha/Folha</FormLabel>
          <Select placeholder="Selecione a subplanilha" ref={worksheetIdRef}>
            {spreadsheet?.worksheets.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button
          onClick={() => onSubmitWorksheetId()}
          isLoading={worksheetLoad.isLoading || spreadsheetLoad.isLoading}
          isDisabled={!spreadsheet?.id}
        >
          Carregar
        </Button>
      </Stack>
    </VStack>
  );
};
