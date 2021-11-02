export type TResult<OkType, ErrType> =
  | Ok<OkType, ErrType>
  | Err<OkType, ErrType>;

export class Ok<OkType, ErrType> {
  constructor(public value: OkType) {}

  isOk(): this is Ok<OkType, ErrType> {
    return true;
  }

  isErr(): this is Err<OkType, ErrType> {
    return false;
  }
}

export class Err<OkType, ErrType> {
  constructor(public value: ErrType) {}

  isOk(): this is Ok<OkType, ErrType> {
    return false;
  }

  isErr(): this is Err<OkType, ErrType> {
    return true;
  }
}

export const Result = {
  ok<OkType, ErrType>(value: OkType): TResult<OkType, ErrType> {
    return new Ok<OkType, ErrType>(value);
  },
  err<OkType, ErrType>(value: ErrType): TResult<OkType, ErrType> {
    return new Err<OkType, ErrType>(value);
  },
};
