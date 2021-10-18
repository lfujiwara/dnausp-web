import {
  RawSpreadsheetMetadata,
  SpreadsheetMetadata,
} from "./spreadsheet-metadata";

import { FetchHeaders } from "../common/fetch-headers";

export const fetchSpreadsheetMetadata = (
  spreadsheetId: string,
  token: string
): Promise<SpreadsheetMetadata> => {
  return fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        ...FetchHeaders.useJson,
      },
    }
  )
    .then((response) => response.json())
    .then((data: RawSpreadsheetMetadata) => ({
      id: data.spreadsheetId,
      title: data.properties.title,
      worksheets: data.sheets.map((sheet) => sheet.properties.title),
    }));
};
