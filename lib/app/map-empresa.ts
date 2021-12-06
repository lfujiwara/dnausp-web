import { DefaultWorksheet } from "@sheets/defaults/default-worksheet";
import { CNAE, CNPJ, Empresa } from "@dnausp/core";
import { Result } from "typescript-monads";

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
): Promise<Result<Empresa, string[]>> => {
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

  return Empresa.create({
    ...id,
    razaoSocial,
    nomeFantasia,
    anoFundacao,
    atividadePrincipal,
    atividadeSecundaria: [],
    situacao,
  });
};
