import { EmpresaFactory } from "@domain/factories/empresa.factory";
import { DefaultWorksheet } from "@sheets/defaults/default-worksheet";
import { defaultToEmpresaInputMapper } from "@sheets/mappers/default-to-empresa-input";

export const useMapToDomain = (sheet: DefaultWorksheet[]) => {
  const result = {
    empresas: sheet.map(defaultToEmpresaInputMapper).map(EmpresaFactory.create),
  };
  console.log(result);
  return result;
};
