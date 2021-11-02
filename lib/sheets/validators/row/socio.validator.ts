import { validateInstituto } from "@domain/validation/instituto";
import { validateNome } from "@domain/validation/nome";
import * as yup from "yup";
import { Result } from "../../../common/result";
import { DefaultWorksheet } from "../../defaults/default-worksheet";
import { RowValidatorEntry } from "../validator-base";

export const validarInstituto = (instituto: string) => {
  const result = validateInstituto(instituto);
  return result.isOk();
};

export const validarEmail = (email: string) => {
  return yup.string().email().required().isValidSync(email);
};

export const validarNome = (nome: string) => {
  if (nome.toLowerCase() === "n/d") return false;
  return yup.string().required().min(2).isValidSync(nome);
};

export const validarNUSP = (nusp: string) => {
  nusp = nusp.replace(/[^0-9]/g, "");
  return /^\d+$/.test(nusp);
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

    const resultInstituto = validateInstituto(getInstituto(n)(row) + "");
    const email = getEmail(n)(row);
    const nusp = getNUSP(n)(row);
    const resultNome = validateNome(getNome(n)(row) + "");

    if (resultInstituto.isErr()) {
      errors.push(`Instituto inválido: ${resultInstituto.value}`);
    }

    if (resultNome.isErr()) {
      errors.push(`Nome inválido: ${resultNome.value}`);
    }

    if (email && !validarEmail(email)) {
      errors.push(`Email inválido: ${email}`);
    }

    if (nusp && !validarNUSP(nusp)) {
      errors.push(`NUSP inválido: ${nusp}`);
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
