import { Result, TResult } from "@common/result";

const isString = (value: any): value is string => typeof value === "string";

export const validateNome = (nome: string): TResult<string, string[]> => {
  const errors: string[] = [];
  nome = nome.trim();

  if (!isString(nome) || nome.length < 1) {
    errors.push("Nome inválido");
  }

  if (errors.length > 0) {
    return Result.err(errors);
  }
  return Result.ok(nome);
};
