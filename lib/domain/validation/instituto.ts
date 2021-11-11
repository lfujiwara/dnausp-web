import FuzzySet from "fuzzyset";
import { Result } from "@common/result";
import _institutos from "@json-assets/institutos.json";

const institutosSet = FuzzySet(
  _institutos.map((instituto) => `${instituto.nome} - ${instituto.sigla}`)
);

export const _validateInstituto = (instituto: string) => {
  return institutosSet.get(instituto);
};

export const validateInstituto = (instituto: string) => {
  const errors: string[] = [];
  const result = _validateInstituto(instituto);

  let _instituto = "";

  if (!result)
    errors.push(
      "Instituto inválido (nenhum com nome igual ou similar encontrado)"
    );
  else {
    _instituto = result[0][1];
  }

  if (errors.length > 0) return Result.err(errors);
  return Result.ok(_instituto);
};
