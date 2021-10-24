import { RowValidator, RowValidatorEntry } from "../validator-base";

import { Result } from "../../../common/result";

const validarCNPJ = (cnpj: string): boolean => {
  cnpj = cnpj.replace(/[^\d]+/g, "");

  if (cnpj == "") return false;

  if (cnpj.length != 14) return false;

  if (cnpj.split("").every((c) => c === cnpj[0])) return false;

  const digits = cnpj.split("").map((c) => parseInt(c));

  const dv1_rm =
    (digits.slice(0, 4).reduce((a, b, i) => a + b * (5 - i), 0) +
      digits.slice(4, 12).reduce((a, b, i) => a + b * (9 - i), 0)) %
    11;
  const dv1 = dv1_rm < 2 ? 0 : 11 - dv1_rm;
  if (dv1 !== digits[12]) return false;

  const dv2_rm =
    (digits.slice(0, 5).reduce((a, b, i) => a + b * (6 - i), 0) +
      digits.slice(5, 13).reduce((a, b, i) => a + b * (9 - i), 0)) %
    11;
  const dv2 = dv2_rm < 2 ? 0 : 11 - dv2_rm;
  return dv2 === digits[13];
};

const COL_NAME = "CNPJ";

export const CNPJValidatorEntry: RowValidatorEntry = {
  name: "CNPJ",
  description: "Validação por CNPJ",
  validator: async (row) => {
    const cnpj = row[COL_NAME] + "";

    if (!validarCNPJ(cnpj) && cnpj.toLowerCase().indexOf("exterior") === -1)
      return Result.err({
        errors: ["CNPJ Inválido"],
        row,
      } as RowValidator.ResultErr);

    return Result.ok(row);
  },
};
