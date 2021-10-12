export type SpreadsheetMetadata = {
  id: string;
  title: string;
  worksheets: string[];
};

export type RawSpreadsheetMetadata = {
  spreadsheetId: string;
  properties: {
    title: string;
  };
  sheets: {
    properties: {
      title: string;
    };
  }[];
};
