import { WorksheetData } from "../lib/sheets/sheet";
import { fetchWorksheet } from "../lib/sheets/fetch-worksheet";
import { useGoogleAuthData } from "../auth/google/google-auth.context";
import { useState } from "react";

type WorksheetFetcherState = {
  spreadsheetId: string;
  worksheet: string;
  isLoaded: boolean;
  isLoading: boolean;
  isError: boolean;

  data?: WorksheetData;
};

export const useWorksheetFetcher = () => {
  const { accessToken } = useGoogleAuthData();

  const [state, setState] = useState<WorksheetFetcherState>({
    spreadsheetId: "",
    worksheet: "",
    isLoaded: false,
    isLoading: false,
    isError: false,
  });

  const _fetchWorksheet = async (spreadsheetId: string, worksheet: string) =>
    fetchWorksheet(spreadsheetId, worksheet, accessToken).then((data) =>
      setState({
        spreadsheetId,
        worksheet,
        isLoaded: true,
        isLoading: false,
        isError: false,
        data,
      })
    );

  return {
    ...state,
    fetch: _fetchWorksheet,
  };
};
