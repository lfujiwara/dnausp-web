/**
 * @param _spreadsheetId Spreadsheet ID or URL
 * @returns Spreadsheet ID
 */
export function parseSpreadsheetId(_spreadsheetId: string) {
  let firstIndex = _spreadsheetId.indexOf("/d/");
  firstIndex = firstIndex === -1 ? 0 : firstIndex + 3;
  let lastIndex = _spreadsheetId.lastIndexOf("/");
  lastIndex = lastIndex === -1 ? _spreadsheetId.length : lastIndex;

  const spreadsheetId = _spreadsheetId.slice(firstIndex, lastIndex);
  return spreadsheetId;
}
