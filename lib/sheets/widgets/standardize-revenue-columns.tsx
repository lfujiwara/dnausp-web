import { IWidget, IWidgetReturnValue } from ".";

import { WorksheetData } from "../sheet";

export const StandardizeRevenueColumn: IWidget & {
  execute: (data: WorksheetData, colIndex: number) => IWidgetReturnValue;
} = {
  name: "Padronizar campo faturamento",
  execute: (data: WorksheetData, colIndex: number): IWidgetReturnValue => {
    const getRevenue = (row: string[]) => row[colIndex];
    const result: IWidgetReturnValue = {
      matched: [],
      unmatched: [],
      errors: [],
    };
    for (const row of data.rows) {
      let revenue = getRevenue(row);
      if (revenue == null) revenue = "0";
      revenue = revenue
        .replace(/[^0-9.,]/g, "")
        .replace(".", "")
        .replace(",", ".");
      row[colIndex] = revenue;
      result.matched.push(row);
    }
    return result;
  },
};
