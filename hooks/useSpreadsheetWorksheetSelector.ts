import { SpreadsheetMetadata } from "../lib/sheets/spreadsheet-metadata";
import { fetchSpreadsheetMetadata } from "../lib/sheets/fetch-spreadsheet-metadata";
import { useGoogleAuthData } from "../auth/google/google-auth.context";
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
    const { accessToken } = useGoogleAuthData();

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

    const loadSpreadsheetMetadata = (spreadsheetId: string) =>
      fetchSpreadsheetMetadata(spreadsheetId, accessToken)
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
