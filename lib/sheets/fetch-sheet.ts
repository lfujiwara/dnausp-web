import { RawSheet } from "./sheet";

const isRowNotEmpty = (row: string[]) =>
  row.length !== 0 && row.some((cell) => !!cell);

export const fetchSheet = async (
  sheetId: string,
  worksheetId: string,
  token: string
) =>
  fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${worksheetId}!A1%3ACH2591`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data: RawSheet) => data.values)
    .then((values) => ({
      header: values[0] || [],
      rows: values.slice(1).filter(isRowNotEmpty),
    }));
