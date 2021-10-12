import { RawWorksheetData, WorksheetData } from "./sheet";

import { FetchHeaders } from "../common/fetch-headers";

const isRowNotEmpty = (row: string[]) =>
  row.length !== 0 && row.some((cell) => !!cell);

export const fetchWorksheet = (
  sheetId: string,
  worksheetId: string,
  token: string
): Promise<WorksheetData> =>
  fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${worksheetId}!A1%3ACH2591`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        ...FetchHeaders.useJson,
      },
    }
  )
    .then((res) => res.json())
    .then((data: RawWorksheetData) => data.values)
    .then((values) => ({
      header: values[0] || [],
      rows: values.slice(1).filter(isRowNotEmpty),
    }));
