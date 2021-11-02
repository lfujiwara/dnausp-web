import { validateCNAE } from "@domain/validation/cnae";
import { Result } from "../../../common/result";
import { RowValidatorEntry } from "../validator-base";

const COL_NAME =
  "CNAE (Classificação Nacional de Atividades Econômicas) da empresa";

export const CNAEValidatorEntry: RowValidatorEntry = {
  name: "CNAE",
  description: "Valida o CNAE da empresa",
  validator: async (row) => {
    const result = validateCNAE(row[COL_NAME] + "");
    if (result.isOk()) return Result.ok(row);
    return Result.err({
      row,
      errors: [`CNAE inválido: ${row[COL_NAME]}`],
    });
  },
};
