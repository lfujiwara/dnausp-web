import { IWidget, IWidgetReturnValue } from ".";

import { WorksheetData } from "../sheet";

export const FilterByFoundedInYearRange: IWidget & {
  execute: (
    data: WorksheetData,
    minYear: number,
    maxYear: number,
    yearColIndex: number
  ) => IWidgetReturnValue;
} = {
  name: "Filtrar por ano de fundação (range)",
  execute: (
    data: WorksheetData,
    minYear: number,
    maxYear: number,
    yearColIndex: number
  ): IWidgetReturnValue => {
    const getYear = (row: string[]) => parseInt(row[yearColIndex], 10);

    const result: IWidgetReturnValue = {
      matched: [],
      unmatched: [],
      errors: [],
    };

    for (const row of data.rows) {
      const year = getYear(row);

      if (year >= minYear && year <= maxYear) {
        result.matched.push(row);
      } else if (!isNaN(year)) {
        result.unmatched.push(row);
      } else {
        result.errors.push(row);
      }
    }

    return result;
  },
};
