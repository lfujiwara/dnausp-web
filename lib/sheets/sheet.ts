export type RawSheet = {
  majorDimension: string;
  range: string;
  values: string[][];
};

export type Sheet = {
  header: string[];
  rows: string[][];
};
