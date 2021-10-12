export type RawWorksheetData = {
  majorDimension: string;
  range: string;
  values: string[][];
};

export type WorksheetData = {
  header: string[];
  rows: string[][];
};
