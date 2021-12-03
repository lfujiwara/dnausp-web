import { SpreadsheetMetadata } from "@sheets/spreadsheet-metadata";
import { fetchSpreadsheetMetadata } from "@sheets/fetch-spreadsheet-metadata";
import { useState } from "react";

export type TSpreadsheetWorksheetSelector = {
  spreadsheetId: string;
  isLoaded: boolean;
  isLoading: boolean;
  isError: boolean;

  spreadsheetMetadata?: SpreadsheetMetadata;
  selectedWorksheet: string;

  loadSpreadsheetMetadata: (spreadsheetId: string) => Promise<void>;
  setSelectedWorksheet: (worksheet: string) => void;
};

export const useSpreadsheetWorksheetSelector =
  (): TSpreadsheetWorksheetSelector => {
    const accessToken = "";

    type SpreadsheetWorksheetSelectorState = {
      spreadsheetId: string;
      isLoaded: boolean;
      isLoading: boolean;
      isError: boolean;

      spreadsheetMetadata?: SpreadsheetMetadata;
      selectedWorksheet: string;
    };

    const [state, setState] = useState<SpreadsheetWorksheetSelectorState>({
      spreadsheetId: "",
      isLoaded: false,
      isLoading: false,
      isError: false,
      spreadsheetMetadata: undefined,
      selectedWorksheet: "",
    });

    const loadSpreadsheetMetadata = (spreadsheetId: string) => {
      setState({
        ...state,
        isLoading: true,
        isError: false,
        isLoaded: false,
      });
      return fetchSpreadsheetMetadata(spreadsheetId, accessToken)
        .then((spreadsheetMetadata) =>
          setState({
            ...state,
            spreadsheetMetadata,
            spreadsheetId,
            isLoaded: true,
            isLoading: false,
            isError: false,
          })
        )
        .catch(() =>
          setState({
            ...state,
            spreadsheetId,
            isLoaded: false,
            isLoading: false,
            isError: true,
          })
        );
    };

    const setSelectedWorksheet = (selectedWorksheet: string) =>
      setState({
        ...state,
        selectedWorksheet,
      });

    return {
      ...state,
      loadSpreadsheetMetadata,
      setSelectedWorksheet,
    };
  };
