import { useAxios } from "../../../hooks/axios";
import { useQuery } from "react-query";

export const useCNAEStatsQuery = (params: any) => {
  const axios = useAxios();

  return useQuery(
    ["/empresas/cnae/stats", params],
    () =>
      axios
        .get("/empresas/cnae/stats", {
          params: params,
        })
        .then(
          (res) =>
            res.data as {
              cnae: string;
              count: number;
            }[]
        ),
    {
      initialData: [],
      keepPreviousData: true,
    }
  );
};
