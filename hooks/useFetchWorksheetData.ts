import { useGAPIContext } from "@auth/gapi/GAPIAuthContext";
import { fetchWorksheet } from "@sheets/fetch-worksheet";

export const useFetchWorksheetData = () => {
  const { accessToken } = useGAPIContext();

  return (spreadsheet: string, worksheet: string) =>
    fetchWorksheet(spreadsheet, worksheet, accessToken);
};
