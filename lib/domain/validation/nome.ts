import { Result, TResult } from "@common/result";

const isString = (value: any): value is string => typeof value === "string";

export const validateNome = (
  nome: string,
  strict = false
): TResult<string, string[]> => {
  const errors: string[] = [];
  nome = nome.trim();

  if (!isString(nome) || nome.length < 1) {
    errors.push("Nome inválido (vazio)");
  }

  if (strict) {
    if (nome.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\n]+/)) {
      errors.push("Nome inválido - Possui caracteres especiais");
    }
  }

  if (errors.length > 0) {
    return Result.err(errors);
  }
  return Result.ok(nome);
};
