import { DefaultWorksheet } from "@sheets/defaults/default-worksheet";
import FuzzySet from "fuzzyset";
import { Result } from "@common/result";
import _institutos from "./institutos.json";

const institutosSet = FuzzySet(
  _institutos.map((instituto) => `${instituto.nome} - ${instituto.sigla}`)
);

export const _validateInstituto = (instituto: string) => {
  return institutosSet.get(instituto);
};

export const validateInstituto = (instituto: string) => {
  const errors: string[] = [];
  const _instituto = _validateInstituto(instituto);
  if (!!_instituto)
    errors.push(
      "Instituto inválido (nenhum com nome igual ou similar encontrado)"
    );

  if (errors.length > 0) return Result.err(errors);
  return Result.ok(_instituto);
};
