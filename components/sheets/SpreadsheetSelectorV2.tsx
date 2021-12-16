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
import { useLoadingState } from "../../hooks/useLoading";

export const SpreadsheetSelectorV2 = ({
  worksheetData,
  setWorksheetData,
}: {
  worksheetData?: WorksheetData;
  setWorksheetData: (worksheetData: WorksheetData) => any;
}) => {
  const [spreadsheet, setSpreadsheet] = useState<
    SpreadsheetMetadata | undefined
  >();

  const spreadsheetLoad = useLoadingState();
  const worksheetLoad = useLoadingState();

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
    spreadsheetLoad.setLoaded();
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
    spreadsheetLoad.setLoading();
    fetchSpreadsheetMetadata(value)
      .then(handleSpreadsheetMetadata)
      .catch(handleSpreadsheetMetadataError)
      .finally(spreadsheetLoad.setLoaded);
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
    worksheetLoad.setLoading();
    fetchWorksheetData(spreadsheet.id, worksheetId)
      .then(handleWorksheetData)
      .catch(handleWorksheetDataError)
      .finally(worksheetLoad.setLoaded);
  };

  const fetchWorksheetFromLocalStorage = () => {
    const value = p.getSheet();
    if (!worksheetIdRef.current || !value || worksheetData) return;
    worksheetIdRef.current.value = value;
    onSubmitWorksheetId();
  };

  const fetchSpreadsheetFromLocalStorage = () => {
    const value = p.getSpreadsheet();
    if (!spreadsheetIdRef.current || !value) return;
    spreadsheetIdRef.current.value = value;
    if (value === spreadsheet?.id) return;
    onSubmitSpreadsheetId();
  };

  useEffect(() => {
    fetchSpreadsheetFromLocalStorage();
  }, []);

  let fuse = true;
  useEffect(() => {
    if (!fuse) return;
    fuse = false;
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
          <Input ref={spreadsheetIdRef} />
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
