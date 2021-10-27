import { Result } from "../../../common/result";
import { RowValidator, RowValidatorEntry } from "../validator-base";
import institutos from "./institutos.json";

const validarInstituto = (instituto: string): boolean => {
  console.log(instituto);
  return false;
};

const COL_NAME =
  "Com qual instituto, escola ou centro é o vínculo atual ou mais recente?";
export const InstituteValidatorEntry: RowValidatorEntry = {
  name: "Instituto",
  description: "Validar nome dos institutos",
  validator: async (row) => {
    console.log(row[COL_NAME]);
    return Result.ok(row);
  },
};
