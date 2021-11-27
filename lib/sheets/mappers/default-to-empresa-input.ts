import { EmpresaFactory } from "@domain/factories/empresa.factory";
import { DefaultWorksheet } from "@sheets/defaults/default-worksheet";

export const defaultToEmpresaInputMapper = (
  input: DefaultWorksheet
): EmpresaFactory.Input => {
  return {
    cnpj: input["CNPJ"],
    estrangeira: input["CNPJ"].toString().toLowerCase().includes("exterior"),
    nomeFantasia: input["Nome fantasia da empresa"],
    razaoSocial: input["Razão social da empresa"],
    anoDeFundacao: Number(input["Ano de fundação"] + ""),
    cnae: input[
      "CNAE (Classificação Nacional de Atividades Econômicas) da empresa"
    ],
    situacaoReceita: input["Status operacional da empresa"],
    tipoSocietario: input["Tipo de empresa"],
  };
};
