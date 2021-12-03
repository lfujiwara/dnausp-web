import { WorksheetData } from "@sheets/sheet";
import { fetchWorksheet } from "@sheets/fetch-worksheet";
import { useState } from "react";

type WorksheetFetcherState = {
  spreadsheetId: string;
  worksheet: string;
  isLoaded: boolean;
  isLoading: boolean;
  isError: boolean;

  data?: WorksheetData;
};

const defaultState = {
  spreadsheetId: "",
  worksheet: "",
  isLoaded: false,
  isLoading: false,
  isError: false,
};

export const useWorksheetFetcher = () => {
  const [state, setState] = useState<WorksheetFetcherState>(defaultState);
  const token = "";

  const _fetchWorksheet = async (spreadsheetId: string, worksheet: string) => {
    setState({ ...state, isLoading: true, isError: false });
    return fetchWorksheet(spreadsheetId, worksheet, token).then((data) =>
      setState({
        spreadsheetId,
        worksheet,
        isLoaded: true,
        isLoading: false,
        isError: false,
        data,
      })
    );
  };

  const reset = () => setState(defaultState);

  return {
    ...state,
    fetch: _fetchWorksheet,
    reset,
  };
};
