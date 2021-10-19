export interface IWidget {
  name: string;
}

export interface IWidgetReturnValue {
  matched: string[][];
  unmatched: string[][];
  errors: string[][];
}
