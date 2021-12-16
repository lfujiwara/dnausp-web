import FuzzySet from "fuzzyset";
import { Instituto, InstitutoNome } from "@dnausp/core";

const keySet = Object.values(Instituto).reduce(
  (acc, i) => ({
    ...acc,
    [`${InstitutoNome[i]} - ${i}`]: i,
  }),
  {}
);

const institutoSet = FuzzySet(Object.keys(keySet));

export const getInstituto = (s: string) => {
  const result = institutoSet.get(s.split(";")[0]);
  if (result === null) return undefined;
  return keySet[result[0][1]] as Instituto;
};
