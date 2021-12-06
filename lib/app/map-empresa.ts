import { DefaultWorksheet } from "@sheets/defaults/default-worksheet";
import { CNAE, CNPJ, Empresa, Faturamento } from "@dnausp/core";
import { Result } from "typescript-monads";

export type InputOutput<O = any, I = any> = {
  input: I;
  output: O;
};
export type MapEmpresaValue = {
  root: Empresa;
  faturamentos: InputOutput<Result<Faturamento, string[]>, [number, string]>[];
};
type FaturamentoEntry = [number, keyof DefaultWorksheet];

const handleCNPJ = (
  raw: string
): Result<{ cnpj: CNPJ; estrangeira: false }, string> => {
  const result = CNPJ.create(raw);
  if (result.isOk())
    return Result.ok({ cnpj: result.unwrap(), estrangeira: false });
  return Result.fail(result.unwrapFail());
};

const handleEstrangeira = (raw: string) => {
  raw = raw.toLowerCase();
  const toSearch = "exterior";
  if (raw.indexOf(toSearch) === -1) Result.fail("Empresa não é estrangeira");
  const index = raw.indexOf(toSearch) + toSearch.length;
  const idEstrangeira = parseInt(raw.slice(index), 10);
  return Result.ok({
    estrangeira: true,
    idEstrangeira,
  });
};

export const mapEmpresa = async (
  data: DefaultWorksheet
): Promise<Result<MapEmpresaValue, string[]>> => {
  const errors: string[] = [];

  let id:
    | { cnpj: CNPJ; estrangeira: false }
    | { estrangeira: boolean; idEstrangeira: number } = undefined as any;
  let anoFundacao: number = undefined as any;
  let atividadePrincipal: CNAE = undefined as any;
  const razaoSocial = data["Razão social da empresa"];
  const nomeFantasia = data["Nome fantasia da empresa"];
  const situacao = data["Status operacional da empresa"];

  const idResult = data.CNPJ.toLowerCase().includes("exterior")
    ? handleEstrangeira(data.CNPJ)
    : handleCNPJ(data.CNPJ);
  if (idResult.isFail())
    errors.push("Empresa sem CNPJ válido e sem ID estrangeira válida");
  else id = idResult.unwrap();

  const anoFundacaoResult = Empresa.validateAnoDeFundacao(
    data["Ano de fundação"]
  );
  if (anoFundacaoResult.isFail())
    errors.push("Empresa sem ano de fundação válido");
  else anoFundacao = anoFundacaoResult.unwrap();

  const cnaeResult = CNAE.create(
    data["CNAE (Classificação Nacional de Atividades Econômicas) da empresa"]
  );
  if (cnaeResult.isFail()) errors.push("Empresa sem CNAE válido");
  else atividadePrincipal = cnaeResult.unwrap();

  if (errors.length > 0) return Result.fail(errors);

  const faturamentos = (
    [
      [2018, "Faturamento 2018 (RFB)"],
      [2019, "Faturamento 2019 (ou estimativa da RFB) com porte"],
      [2020, "Qual foi o faturamento da empresa em 2020? (R$)"],
    ] as FaturamentoEntry[]
  )
    .map(([ano, key]) => [ano, data[key]] as [number, string])
    .map(([ano, value]) => ({
      input: [ano, value] as [number, string],
      output: Faturamento.create(
        ano,
        parseInt(value.slice(0, value.indexOf(",")).replace(/\D/g, ""), 10) *
          100
      ),
    }));

  const result = Empresa.create({
    ...id,
    razaoSocial,
    nomeFantasia,
    anoFundacao,
    atividadePrincipal,
    atividadeSecundaria: [],
    situacao,
    faturamentos: faturamentos
      .map((f) => f.output)
      .filter((f) => f.isOk())
      .map((f) => f.unwrap()),
  });

  if (result.isFail()) return Result.fail(result.unwrapFail());

  return Result.ok({
    root: result.unwrap(),
    faturamentos,
  });
};
