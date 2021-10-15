import {
  RawSpreadsheetMetadata,
  SpreadsheetMetadata,
} from "./spreadsheet-metadata";

import { FetchHeaders } from "../common/fetch-headers";

export const fetchSpreadsheetMetadata = (
  _spreadsheetId: string,
  token: string
): Promise<SpreadsheetMetadata> => {
  let firstIndex = _spreadsheetId.indexOf("/d/");
  firstIndex = firstIndex === -1 ? 0 : firstIndex + 3;
  let lastIndex = _spreadsheetId.lastIndexOf("/");
  lastIndex = lastIndex === -1 ? _spreadsheetId.length : lastIndex;

  const spreadsheetId = _spreadsheetId.slice(firstIndex, lastIndex);
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
