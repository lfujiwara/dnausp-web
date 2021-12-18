import { useQuery } from "react-query";
import { useAxios } from "../../hooks/axios";
import {
  DistribuicaoCnaePorAnoFundacaoQueryOutput,
  DistribuicaoCnaePorInstitutoQueryOutput,
  DistribuicaoCnaeQueryOutput,
  DistribuicaoGeneroPorAnoFundacaoQueryOutput,
  DistribuicaoGeneroPorInstitutoQueryOutput,
  DistribuicaoGeneroQueryOutput,
  DistribuicaoInstitutoPorCnaeQueryOutput,
  FaturamentoQueryOutput,
  FilterEmpresa,
} from "@dnausp/core";

export const makeBackendQuery =
  <Req, Res>(route) =>
  (req: Req) => {
    const axios = useAxios();
    return useQuery<Res>(
      [route, req],
      () =>
        axios
          .get(`/empresas/query/${route}`, { params: req })
          .then((res) => res.data),
      {
        refetchInterval: false,
        keepPreviousData: true,
      }
    );
  };

export const useDistribuicaoCnaeQuery = makeBackendQuery<
  FilterEmpresa,
  DistribuicaoCnaeQueryOutput
>("distribuicao-cnae");

export const useDistribuicaoCnaePorAnoFundacaoQuery = makeBackendQuery<
  void,
  DistribuicaoCnaePorAnoFundacaoQueryOutput
>("distribuicao-cnae-por-ano-fundacao");

export const useDistribuicaoCnaePorInstituto = makeBackendQuery<
  void,
  DistribuicaoCnaePorInstitutoQueryOutput
>("distribuicao-cnae-por-instituto");

export const useDistribuicaoGeneroQuery = makeBackendQuery<
  void,
  DistribuicaoGeneroQueryOutput
>("distribuicao-genero");

export const useDistribuicaoGeneroPorAnoFundacaoQuery = makeBackendQuery<
  void,
  DistribuicaoGeneroPorAnoFundacaoQueryOutput
>("distribuicao-genero-por-ano-fundacao");

export const useDistribuicaoGeneroPorInstitutoQuery = makeBackendQuery<
  void,
  DistribuicaoGeneroPorInstitutoQueryOutput
>("distribuicao-genero-por-instituto");

export const useDistribuicaoInstitutoPorCnaeQuery = makeBackendQuery<
  void,
  DistribuicaoInstitutoPorCnaeQueryOutput
>("distribuicao-instituto-por-cnae");

export const useFaturamentoQuery = makeBackendQuery<
  FilterEmpresa,
  FaturamentoQueryOutput
>("faturamento");
