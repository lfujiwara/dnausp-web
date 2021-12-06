export interface ISheetPreferences {
  sheetId?: string;
  spreadsheetId?: string;
}

const SHEET_ID_KEY = "sheetId";
const SPREADSHEET_ID_KEY = "spreadsheetId";

export const useSheetPreferences = () => {
  return {
    setSheet: (sheetId: string) => localStorage.setItem(SHEET_ID_KEY, sheetId),
    getSheet: () => localStorage.getItem(SHEET_ID_KEY),
    setSpreadsheet: (spreadsheetId: string) =>
      localStorage.setItem(SPREADSHEET_ID_KEY, spreadsheetId),
    getSpreadsheet: () => localStorage.getItem(SPREADSHEET_ID_KEY),
  };
};
