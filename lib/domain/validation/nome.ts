import { Result } from "@common/result";

const isString = (value: any): value is string => typeof value === "string";

export const validateNome = (nome: string) => {
  if (!isString(nome)) {
    return Result.err("Nome deve ser uma string");
  }

  if (nome.length < 1) {
    return Result.err("Nome deve ter no mínimo 1 caracter");
  }

  return Result.ok(nome);
};
