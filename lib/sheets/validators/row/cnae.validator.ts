import { Result } from "../../../common/result";
import { RowValidatorEntry } from "../validator-base";
import dadosCNAE from "./cnae.json";

const validarCNAE = (cnae: string) => {
  cnae = cnae.replace(/[^0-9]/g, "");
  return Object.keys(dadosCNAE.subclasses).includes(cnae);
};

const COL_NAME =
  "CNAE (Classificação Nacional de Atividades Econômicas) da empresa";

export const CNAEValidatorEntry: RowValidatorEntry = {
  name: "CNAE",
  description: "Valida o CNAE da empresa",
  validator: async (row) => {
    if (validarCNAE(row[COL_NAME] + "")) {
      return Result.ok(row);
    }
    return Result.err({
      row,
      errors: [`CNAE inválido: ${row[COL_NAME]}`],
    });
  },
};
