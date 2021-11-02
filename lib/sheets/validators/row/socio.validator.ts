import * as yup from "yup";

import { DefaultWorksheet } from "../../defaults/default-worksheet";
import FuzzySet from "fuzzyset";
import { Result } from "../../../common/result";
import { RowValidatorEntry } from "../validator-base";
import _institutos from "./institutos.json";

const institutosSet = FuzzySet(
  _institutos.map((instituto) => `${instituto.nome} - ${instituto.sigla}`)
);

export const validarInstituto = (instituto: string) => {
  return institutosSet.get(instituto) !== null;
};

export const validarEmail = (email: string) => {
  return yup.string().email().required().isValidSync(email);
};

export const validarNome = (nome: string) => {
  if (nome.toLowerCase() === "n/d") return false;
  return yup.string().required().min(2).isValidSync(nome);
};

export const validarNUSP = (nusp: string) => {
  return /^\d+$/.test(nusp.trim());
};

const getInstituto = (n: number) => (row: Partial<DefaultWorksheet>) => {
  switch (n) {
    case 1:
      return row[
        "Com qual instituto, escola ou centro é o vínculo atual ou mais recente?"
      ];
    case 2:
      return row[
        "Com qual instituto, escola ou centro é o vínculo atual ou mais recente?__1"
      ];
    case 3:
      return row[
        "Com qual instituto, escola ou centro é o vínculo atual ou mais recente?__2"
      ];
    case 4:
      return row[
        "Com qual instituto, escola ou centro é o vínculo atual ou mais recente?__3"
      ];
    case 5:
      return row[
        "Com qual instituto, escola ou centro é o vínculo atual ou mais recente?__4"
      ];
  }
};

const getEmail = (n: number) => (row: Partial<DefaultWorksheet>) => {
  switch (n) {
    case 1:
      return row["Email do empreendedor"];
    default:
      return undefined;
  }
};

const getNUSP = (n: number) => (row: Partial<DefaultWorksheet>) => {
  switch (n) {
    case 1:
      return row[`Número USP (Sócio 1)`];
    case 2:
      return row[`Número USP (Sócio 2)`];
    case 3:
      return row[`Número USP (Sócio 3)`];
    case 4:
      return row[`Número USP (Sócio 4)`];
    case 5:
      return row[`Número USP (Sócio 5)`];
    default:
      return undefined;
  }
};

const getNome = (n: number) => (row: Partial<DefaultWorksheet>) => {
  switch (n) {
    case 1:
      return row[
        `Nome completo do empreendedor que possuiu ou mantém vínculo com a USP (sem abreviações) (Sócio 1)`
      ];
    case 2:
      return row["Nome completo (Sócio 2)"];
    case 3:
      return row["Nome completo (Sócio 3)"];
    case 4:
      return row["Nome completo (Sócio 4)"];
    case 5:
      return row["Nome completo (Sócio 5)"];
    default:
      return undefined;
  }
};

export const SocioValidatorEntryPrototype: (n: number) => RowValidatorEntry = (
  n
) => ({
  name: `Sócio ${n}`,
  description: `Valida o sócio ${n}`,
  validator: async (row: Partial<DefaultWorksheet>) => {
    const errors: string[] = [];

    const instituto = getInstituto(n)(row);
    const email = getEmail(n)(row);
    const nusp = getNUSP(n)(row);
    const nome = getNome(n)(row);

    if (instituto && !validarInstituto(instituto)) {
      errors.push(`Instituto inválido: ${instituto}`);
    }

    if (email && !validarEmail(email)) {
      errors.push(`Email inválido: ${email}`);
    }

    if (nusp && !validarNUSP(nusp)) {
      errors.push(`NUSP inválido: ${nusp}`);
    }

    if (nome && !validarNome(nome)) {
      errors.push(`Nome inválido: ${nome}`);
    }

    if (errors.length === 0) return Result.ok(row);
    return Result.err({
      errors: errors.map((error) => `Sócio ${n}: ${error}`),
      row,
    });
  },
});

export const SocioValidatorEntries = Array(5)
  .fill(0)
  .map((_, i) => i)
  .map((i) => SocioValidatorEntryPrototype(i));
