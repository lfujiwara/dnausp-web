import { RowValidator, RowValidatorEntry } from "../validator-base";

import { Result } from "../../../common/result";
import { validateCNPJ } from "../../../domain/validation/cnpj";

const COL_NAME = "CNPJ";

export const CNPJValidatorEntry: RowValidatorEntry = {
  name: "CNPJ",
  description: "Validação por CNPJ",
  validator: async (row) => {
    const cnpj = row[COL_NAME] + "";

    const result = validateCNPJ(cnpj);

    if (result.isErr() && cnpj.toLowerCase().indexOf("exterior") === -1)
      return Result.err({
        errors: ["CNPJ Inválido"],
        row,
      } as RowValidator.ResultErr);

    return Result.ok(row);
  },
};
