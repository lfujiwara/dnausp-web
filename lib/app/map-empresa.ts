import { DefaultWorksheet } from "@sheets/defaults/default-worksheet";
import { Empresa, EmpresaFactory, OrigemInvestimento } from "@dnausp/core";
import { Result } from "typescript-monads";
import {
  getEstadoIncubacao,
  getIncubadora,
} from "./fuzzy-matchers/incubacao-fuzzy-matchers";
import { getInstituto } from "./fuzzy-matchers/instituto-fuzzy-matchers";
import { getTipoVinculo } from "./fuzzy-matchers/tipo-vinculo-fuzzy-matchers";

export type InputOutput<I = any, O = any> = {
  input: I;
  output: O;
};
export type MapEmpresaValue = InputOutput<DefaultWorksheet, Empresa>;
type FaturamentoEntry = [number, keyof DefaultWorksheet];

const extractSocio = (
  nome: string,
  email: string,
  telefone: string,
  vinculo: string,
  nusp: string,
  instituto: string
) => {
  return {
    nome,
    email,
    telefone,
    vinculo: {
      tipo: getTipoVinculo(vinculo),
      NUSP: nusp || undefined,
      instituto: getInstituto(instituto) || undefined,
    },
  };
};

const extractInvestimento = (
  origem: OrigemInvestimento,
  anoFiscal: number,
  valor: string
) => ({
  origem,
  anoFiscal,
  valor: parseInt(valor.replace(/\D/g, "").replace(",", "."), 10),
});

export const mapEmpresa = async (
  data: DefaultWorksheet
): Promise<
  Result<MapEmpresaValue, InputOutput<DefaultWorksheet, string[]>>
> => {
  const faturamentos = (
    [
      [2018, "Faturamento 2018 (RFB)"],
      [2019, "Faturamento 2019 (ou estimativa da RFB) com porte"],
      [2020, "Qual foi o faturamento da empresa em 2020? (R$)"],
    ] as FaturamentoEntry[]
  )
    .map(([ano, key]) => [ano, data[key]] as [number, string])
    .map(([anoFiscal, value]) => ({
      anoFiscal,
      valor:
        parseInt(value.slice(0, value.indexOf(",")).replace(/\D/g, ""), 10) *
        100,
    }));

  const estrangeira = data["CNPJ"].toLowerCase().includes("exterior");
  const idEstrangeira =
    !!estrangeira &&
    parseInt(data["CNPJ"].toLowerCase().replace(/\D/g, ""), 10);

  const incubadora = getIncubadora(
    data["Em qual incubadora ou Parque Tecnológico?"].split("-")[0].trim()
  );

  const estado = getEstadoIncubacao(
    data["A empresa está ou esteve em alguma incubadora ou Parque tecnológico?"]
      .replace("Sim. A empresa está", "")
      .trim()
  );

  const incubacoes = incubadora &&
    estado && [
      {
        incubadora,
        estado,
      },
    ];

  const socios = [
    [
      data[
        "Nome completo do empreendedor que possuiu ou mantém vínculo com a USP (sem abreviações)"
      ],
      data["Email do empreendedor"],
      data["Telefone (fixo ou celular)"],
      data["Qual tipo de vínculo já possuiu ou ainda mantém com a USP?"],
      data["Número USP (Sócio 1)"],
      data[
        "Com qual instituto, escola ou centro é o vínculo atual ou mais recente?"
      ],
    ],
    ...Array(4)
      .fill(null)
      .map((_, i) => [
        data[`Nome completo (Sócio ${i + 2})`],
        undefined,
        undefined,
        data[
          `Qual o tipo de vínculo possuiu ou mantém com a USP (Sócio ${i + 2})?`
        ],
        data[`Número USP (Sócio ${i + 2})`],
        data[
          `Com qual instituto, escola ou centro é o vínculo atual ou mais recente?__${
            i + 1
          }`
        ],
      ]),
  ].map(([nome, email, telefone, vinculo, nusp, instituto]) =>
    extractSocio(nome, email, telefone, vinculo, nusp, instituto)
  );

  const anoFundacao = parseInt(data["Ano de fundação"], 10);

  const _historicoQuadroDeColaboradores = [
    {
      anoFiscal: new Date(data["Carimbo de data/hora"]).getFullYear(),
      valor: parseInt(data["Número total de colaboradores"], 10),
    },
    {
      anoFiscal: 2019,
      valor: parseInt(data["Nº colaboradores (RAIS 2019 )"], 10),
    },
    {
      anoFiscal: 2018,
      valor: parseInt(data["Nº colaboradores (RAIS 2018 ) )"], 10),
    },
    {
      anoFiscal: 2015,
      valor: parseInt(data["Nº colaboradores (RAIS 2015 ) )"], 10),
    },
  ].reduce((acc, { anoFiscal, valor }) => {
    acc[anoFiscal] = {
      anoFiscal,
      valor,
    };
    return acc;
  }, {} as { [key: number]: { anoFiscal: number; valor: number } });
  const historicoQuadroDeColaboradores = Object.values(
    _historicoQuadroDeColaboradores
  );

  if (estrangeira)
    return Result.fail({
      input: data,
      output: ["Empresas estrangeiras estão desativadas"],
    });

  const result = EmpresaFactory.create({
    cnpj: data["CNPJ"],
    estrangeira,
    idEstrangeira,
    razaoSocial: data["Razão social da empresa"],
    nomeFantasia: data["Nome fantasia da empresa"],
    anoFundacao,
    atividadePrincipal:
      data["CNAE (Classificação Nacional de Atividades Econômicas) da empresa"],
    situacao: data["Status operacional da empresa"],
    faturamentos,
    incubacoes,
    socios,
    historicoQuadroDeColaboradores,
    historicoInvestimentos: [
      extractInvestimento(
        OrigemInvestimento.PROPRIO,
        anoFundacao,
        data["Valor do investimento próprio (R$)"]
      ),
      extractInvestimento(
        OrigemInvestimento.ANJO,
        anoFundacao,
        data["Valor do investimento-anjo (R$)"]
      ),
      extractInvestimento(
        OrigemInvestimento.VC,
        anoFundacao,
        data["Valor do Venture Capital (R$)"]
      ),
      extractInvestimento(
        OrigemInvestimento.PE,
        anoFundacao,
        data["Valor do Private Equity (R$)"]
      ),
      extractInvestimento(
        OrigemInvestimento.PIPEFAPESP,
        anoFundacao,
        data["Valor do PIPE-FAPESP (R$)"]
      ),
      extractInvestimento(
        OrigemInvestimento.PIPEFAPESP,
        anoFundacao,
        data["Outros investimentos (R$)"]
      ),
    ].filter((i) => i.valor > 0),
  });

  if (result.isFail())
    return Result.fail({
      input: data,
      output: result.unwrapFail(),
    });

  return Result.ok({
    input: data,
    output: result.unwrap(),
  });
};
