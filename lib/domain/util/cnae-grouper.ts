import { cnaeToSecao } from "@domain/util/cnae-to-secao";

export enum CnaeGroupingLevel {
  "SECAO" = "SECAO",
  "DIVISAO" = "DIVISAO",
  "GRUPO" = "GRUPO",
  "CLASSE" = "CLASSE",
  "SUBCLASSE" = "SUBCLASSE",
}

const toSecao = (x: string) => cnaeToSecao(x);
const toDivisao = (x: string) => x.substring(0, 2);
const toGrupo = (x: string) => x.substring(0, 3);
const toClasse = (x: string) => x.substring(0, 5);
const toSubclasse = (x: string) => x.substring(0, 7);

export const cnaeGrouper = (
  cnae: string,
  level = CnaeGroupingLevel.SUBCLASSE
) => {
  switch (level) {
    case CnaeGroupingLevel.SECAO:
      return toSecao(cnae);
    case CnaeGroupingLevel.DIVISAO:
      return toDivisao(cnae);
    case CnaeGroupingLevel.GRUPO:
      return toGrupo(cnae);
    case CnaeGroupingLevel.CLASSE:
      return toClasse(cnae);
    case CnaeGroupingLevel.SUBCLASSE:
      return toSubclasse(cnae);
    default:
      return cnae;
  }
};

export const groupCnaeObject = (
  obj: { [k: string]: number },
  level = CnaeGroupingLevel.SUBCLASSE
) => {
  const keys = Object.keys(obj);
  return keys.reduce((acc, key) => {
    const value = obj[key];
    const group = cnaeGrouper(key, level);
    if (acc[group]) {
      acc[group] += value;
    } else {
      acc[group] = value;
    }
    return acc;
  }, {} as { [k: string]: number });
};
