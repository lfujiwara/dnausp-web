import { Result, TResult } from "@common/result";

export const _validateCNPJ = (cnpj: string): boolean => {
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

export const validateCNPJ = (cnpj: string): TResult<string, string[]> => {
  const _cnpj = cnpj.replace(/[^\d]+/g, "");
  const errors: string[] = [];

  if (!validateCNPJ(_cnpj)) errors.push("CNPJ inválido");

  if (errors.length > 0) return Result.err(errors);
  return Result.ok(_cnpj);
};
