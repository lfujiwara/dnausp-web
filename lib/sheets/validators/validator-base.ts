import { Result, TResult } from "../../common/result";

export namespace RowValidator {
  export type Request = {
    [key: string]: string | undefined;
  };
  export type ResultErr = {
    row: Request;
    errors: string[];
  };
  export type ResultValue = Request;
  export type Result = TResult<ResultValue, ResultErr>;
  export type Spec = (row: Request) => Promise<Result>;
}

export class RowValidatorBuilder {
  constructor(private readonly validators: RowValidator.Spec[] = []) {}

  build(): RowValidator.Spec {
    return async (
      row: RowValidator.Request
    ): Promise<TResult<RowValidator.Request, RowValidator.ResultErr>> => {
      const errors: string[] = [];
      await Promise.all(
        this.validators.map(async (validator) => {
          const result = await validator(row);
          if (result.isErr()) errors.push(...result.value.errors);
        })
      );
      return errors.length > 0
        ? Result.err({
            row,
            errors,
          })
        : Result.ok(row);
    };
  }
}

export interface SheetValidatorRequest {
  header: string[];
  sheet: string[][];
}

export namespace SheetValidator {
  export type Request = RowValidator.Request[];
  type ResponseValue = {
    ok: RowValidator.ResultValue[];
    err: RowValidator.ResultErr[];
  };
  export type Response = ResponseValue;
  export type Spec = (row: Request) => Promise<Response>;
}

export class SheetValidatorBuilder {
  private rowValidatorBuilder: RowValidatorBuilder;

  constructor(validators: RowValidator.Spec[]) {
    this.rowValidatorBuilder = new RowValidatorBuilder(validators);
  }

  build(): SheetValidator.Spec {
    return async (sheet: SheetValidator.Request) => {
      const validateRow = this.rowValidatorBuilder.build();

      const ok: RowValidator.ResultValue[] = [];
      const err: RowValidator.ResultErr[] = [];

      const throwIfItsErr = (r: RowValidator.Result) => {
        if (r.isErr()) throw r.value;
        return r.value;
      };

      await Promise.all(
        sheet.map((row) =>
          validateRow(row)
            .then((r) => r)
            .then(throwIfItsErr)
            .then(ok.push.bind(ok))
            .catch(err.push.bind(err))
        )
      );
      return { ok, err };
    };
  }
}

export type RowValidatorEntry = {
  name: string;
  description?: string;
  validator: RowValidator.Spec;
};
