import { RowValidator, RowValidatorEntry } from "../validator-base";

import { Result } from "../../../common/result";
import ranges from "./zipcode_ranges.json";

function validarAreaCep(cep: string, uf: string): boolean {
  let uf_ranges = ranges.filter((range) => range.uf === uf);
  uf_ranges.forEach((range) => {
    let cepAsNumber = parseInt(cep);
    let max = parseInt(range.max);
    let min = parseInt(range.min);
    if (cepAsNumber >= min && cepAsNumber <= max) return true;
  });
  return false;
}

const cepValido = (cep: string, estado: string): boolean => {
  cep = cep.replace(/[^0-9]/g, "");
  let uf = "";
  // console.log({ cep, estado });
  if (cep.length != 8) return false;

  let uf_match = estado.match(/\((.*)\)/);
  if (uf_match != null) uf = uf_match[0];

  if (uf.length != 2) return false;
  return validarAreaCep(cep, uf);
};

const COL_CEP = "CEP";
const COL_ESTADO = "Estado";

export const CEPValidatorEntry: RowValidatorEntry = {
  name: "CEP",
  description: "Validar CEP cadastrado",
  validator: async (row) => {
    const cep = row[COL_CEP] + "";
    const estado = row[COL_ESTADO] + "";
    if (!cepValido(cep, estado)) {
      return Result.err({
        errors: ["Endereço inválido"],
        row,
      } as RowValidator.ResultErr);
    }
    return Result.ok(row);
  },
};
