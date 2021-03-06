import { Result, TResult } from "@common/result";
import cnaeData from "@json-assets/cnae.json";

const subclasses = cnaeData.subclasses;
const list = new Set(Object.keys(subclasses));

export const validateCNAE = (cnae: string): TResult<string, string[]> => {
  const _cnae = cnae.replace(/[^0-9]/g, "");
  if (list.has(_cnae)) return Result.ok(_cnae);
  return Result.err([`CNAE ${cnae} inválido`]);
};
