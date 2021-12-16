import FuzzySet from "fuzzyset";
import { TipoVinculo } from "@dnausp/core";

const tipoVinculoSet = FuzzySet(Object.values(TipoVinculo));

const formsMap = {
  "Aluno ou ex-aluno de graduação (graduação)": TipoVinculo.GRADUACAO,
  "Aluno ou ex-aluno (pós-graduação)": TipoVinculo.POS_GRADUACAO,
  "Aluno ou ex-aluno (graduação)": TipoVinculo.GRADUACAO,
  "Aluno ou ex-aluno de pós-graduação (mestrado ou doutorado)":
    TipoVinculo.POS_GRADUACAO,
  "Aluno ou ex-aluno de pós-graduação do IPEN (Instituto de Pesquisas Energéticas e Nucleares)":
    TipoVinculo.POS_GRADUACAO,
  Docente: TipoVinculo.DOCENTE,
  "Docente aposentado / Licenciado": TipoVinculo.DOCENTE,
  "Pós-doutorando": TipoVinculo.POS_DOUTORADO,
  Pesquisador: TipoVinculo.PESQUISADOR,
  "Empresa incubada ou graduada em incubadora associada à USP":
    TipoVinculo.INCUBACAO,
};

const formsMapSet = FuzzySet(Object.keys(formsMap));

export const getTipoVinculoFromFormsMapSet = (s: string) => {
  const resultBackup = formsMapSet.get(s);
  if (resultBackup === null) {
    return undefined;
  }
  return formsMap[resultBackup[0][1]] as TipoVinculo;
};

export const getTipoVinculo = (s: string) => {
  if (!s) return undefined;
  s = s.split(";")[0];
  const result = tipoVinculoSet.get(formsMap[s] || s);
  if (!result) return getTipoVinculoFromFormsMapSet(s);
  return result[0][1] as TipoVinculo;
};
