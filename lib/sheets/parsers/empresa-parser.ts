import { IEmpresa } from "@domain/entities/empresa";
import { DefaultWorksheet } from "@sheets/defaults/default-worksheet";

export const empresaParser = (input: DefaultWorksheet): IEmpresa => {
  const getIdEstrangeira = (s: string) => {
    if (s.toString().toLowerCase().includes("exterior")) {
      return Number(s.replace(/[^0-9]/g, ""));
    }
    return undefined;
  };

  return {
    cnpj: input["CNPJ"],
    idEstrangeira: getIdEstrangeira(input["CNPJ"]),
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
