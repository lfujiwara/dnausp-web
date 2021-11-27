export interface IReport {
  warns: string[];
  errors: string[];
}

export const makeReport = (): IReport => ({
  warns: [],
  errors: [],
});

export type ReportedValue<T> = IReport & { value: T };
