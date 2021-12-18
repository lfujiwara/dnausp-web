import { FC } from "react";
import { DistribuicaoCNAEDisplay } from "./DistribuicaoCNAEDisplay";
import { DistribuicaoCNAEPorAnoFundacao } from "./DistribuicaoCNAEPorAnoFundacao";
import { DistribuicaoCNAEPorInstituto } from "./DistribuicaoCNAEPorInstituto";
import { DistribuicaoGenero } from "./DistribuicaoGenero";
import { DistribuicaoGeneroPorAnoFundacao } from "./DistribuicaoGeneroPorAnoFundacao";
import { DistribuicaoGeneroPorInstituto } from "./DistribuicaoGeneroPorInstituto";
import { Faturamento } from "./Faturamento";

export type ChartEntry = {
  name: string;
  chart: FC<{}>;
};

export const charts: ChartEntry[] = [
  {
    name: "Distribuição CNAE",
    chart: DistribuicaoCNAEDisplay,
  },
  {
    name: "Distribuição CNAE por ano de fundação da empresa",
    chart: DistribuicaoCNAEPorAnoFundacao,
  },
  {
    name: "Distribuição CNAE por instituto",
    chart: DistribuicaoCNAEPorInstituto,
  },
  {
    name: "Distribuição de gênero dos sócios das empresas",
    chart: DistribuicaoGenero,
  },
  {
    name: "Distribuição de gênero dos sócios das empresas, por ano de fundação da empresa",
    chart: DistribuicaoGeneroPorAnoFundacao,
  },
  {
    name: "Distribuição de gênero dos sócios das empresas, por instituto",
    chart: DistribuicaoGeneroPorInstituto,
  },
  {
    name: "Média de faturamento das empresas, por ano fiscal",
    chart: Faturamento,
  },
];
