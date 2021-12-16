import { Empresa } from "@dnausp/core";
import { CNPJJsonSerializer } from "./cnpj-json.serializer";
import { CNAEJsonSerializer } from "./cnae.json-serializer";
import { FaturamentoJsonSerializer } from "./faturamento.json-serializer";

export class EmpresaJsonSerializer {
  static serialize(empresa: Empresa) {
    return {
      id: empresa.id,
      idEstrangeira: empresa.idEstrangeira,
      estrangeira: empresa.estrangeira,
      cnpj: empresa.cnpj && CNPJJsonSerializer.serialize(empresa.cnpj),
      razaoSocial: empresa.razaoSocial,
      nomeFantasia: empresa.nomeFantasia,
      anoFundacao: empresa.anoFundacao,
      atividadePrincipal:
        empresa.atividadePrincipal &&
        CNAEJsonSerializer.serialize(empresa.atividadePrincipal),
      atividadeSecundaria: empresa.atividadeSecundaria.map(
        CNAEJsonSerializer.serialize
      ),
      situacao: empresa.situacao,
      faturamentos: empresa.historicoFaturamentos.valores.map(
        FaturamentoJsonSerializer.serialize
      ),
      historicoQuadroDeColaboradores:
        empresa.historicoQuadroDeColaboradores.valores.map(
          ({ anoFiscal, valor }) => ({ anoFiscal, valor })
        ),
      historicoInvestimentos: empresa.historicoInvestimentos.map(
        ({ anoFiscal, valor, origem }) => ({ anoFiscal, valor, origem })
      ),
      incubacoes: empresa.incubacoes.map((i) => ({
        incubadora: i.incubadora,
        estado: i.estado,
      })),
      socios: empresa.socios.map((s) => ({
        nome: s.nome,
        vinculo: {
          tipo: s.vinculo.tipo,
          NUSP: s.vinculo.NUSP,
          instituto: s.vinculo.instituto,
        },
      })),
    };
  }
}
