import { DefaultWorksheet } from "../../defaults/default-worksheet";
import { Result } from "../../../common/result";
import { RowValidatorEntry } from "../validator-base";

const validarAno = (_ano: string) => {
  const ano = parseInt(_ano, 10);
  if (isNaN(ano)) return false;

  const anoAtual = new Date().getFullYear();
  return ano <= anoAtual;
};

export const AnoValidatorEntry: RowValidatorEntry = {
  name: "Ano de fundação",
  description:
    "Verifica se o ano é válido e é um número igual ou menor ao ano atual.",
  validator: async (row: Partial<DefaultWorksheet>) => {
    if (validarAno(row["Ano de fundação"] + "")) return Result.ok(row);
    else
      return Result.err({
        errors: ["O ano de fundação é inválido."],
        row,
      });
  },
};
