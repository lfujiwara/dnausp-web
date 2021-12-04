import axios from "axios";
import {
  RawSpreadsheetMetadata,
  SpreadsheetMetadata,
} from "@sheets/spreadsheet-metadata";
import { useGAPIContext } from "@auth/gapi/GAPIAuthContext";

export const useFetchSpreadSheetMetadata = () => {
  const { accessToken } = useGAPIContext();
  return (spreadsheetId: string) =>
    axios
      .get<RawSpreadsheetMetadata>(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => response.data)
      .then(
        (data): SpreadsheetMetadata => ({
          id: data.spreadsheetId,
          title: data.properties.title,
          worksheets: data.sheets.map((sheet) => sheet.properties.title),
        })
      );
};