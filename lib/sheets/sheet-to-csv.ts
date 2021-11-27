import Papa from "papaparse";
import { downloadTextAsCSVFile } from "./download-text-to-csv";
import { WorksheetData } from "./sheet";

export const sheetToCsv = (sheet: WorksheetData, filename = "sheet.csv") => {
  const keyedRows = sheet.rows.map((row) => {
    const keyedRow: { [key: string]: any } = {};
    row.forEach((cell, i) => {
      keyedRow[sheet.header[i]] = cell.toString();
    });
    return keyedRow;
  });

  const unparsed = Papa.unparse(keyedRows, { header: true });
  downloadTextAsCSVFile(unparsed, filename);
};
