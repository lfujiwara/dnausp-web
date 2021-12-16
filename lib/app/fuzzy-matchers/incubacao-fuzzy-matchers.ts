import { EstadoIncubacao, IncubadoraUSP } from "@dnausp/core";
import FuzzySet from "fuzzyset";

const incubadoraSet = FuzzySet(Object.values(IncubadoraUSP));
const estadoIncubacaoSet = FuzzySet(Object.values(EstadoIncubacao));

export const getIncubadora = (s: string) => {
  const result = incubadoraSet.get(s);
  if (result === null) return undefined;
  return result[0][1] as IncubadoraUSP;
};

export const getEstadoIncubacao = (s: string) => {
  const result = estadoIncubacaoSet.get(s);
  if (result === null) return undefined;
  return result[0][1] as EstadoIncubacao;
};
