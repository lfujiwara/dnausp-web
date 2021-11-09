import { Result, TResult } from "@common/result";

const possibleValues = ["Nula", "Ativa", "Suspensa", "Inapta", "Baixada"].map(
  (s) => s.toUpperCase()
);
const getValue = (s: string) =>
  possibleValues.find((v) => v === s.toUpperCase());

export const validateSituacaoReceita = (
  situacaoReceita: string
): TResult<string, string[]> => {
  const errors: string[] = [];
  let situacao = getValue(situacaoReceita);

  if (situacao) return Result.ok(situacaoReceita);
  else errors.push(`Situacao receita inválida: ${situacaoReceita}`);

  return Result.err(errors);
};
