import Papa from "papaparse";
import { WorksheetData } from "./sheet";

const downloadLinkClassIdentifier = `download-link-${new Date().getTime()}`;

const downloadTextAsCSVFile = (unparsed: string, filename = "file.csv") => {
  const universalBOM = "\uFEFF";
  const blob = new Blob([universalBOM + unparsed], {
    type: "text/csv",
    endings: "native",
  });
  const href = window.URL.createObjectURL(blob);

  document
    .querySelectorAll(`.${downloadLinkClassIdentifier}`)
    .forEach((el) => el.remove());

  const link = document.createElement("a");
  link.className = downloadLinkClassIdentifier;
  link.setAttribute("href", href);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
};

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
