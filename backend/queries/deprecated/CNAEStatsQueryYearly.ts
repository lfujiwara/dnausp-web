import { useAxios } from "../../../hooks/axios";
import { useQuery } from "react-query";

export const useCNAEStatsQueryYearly = () => {
  const axios = useAxios();

  return useQuery(
    ["/empresas/cnae/stats/yearly"],
    () =>
      axios.get("/empresas/cnae/stats/yearly").then(
        (res) =>
          res.data as {
            year: number;
            value: {
              cnae: string;
              count: number;
            }[];
          }[]
      ),
    {
      initialData: [],
      keepPreviousData: true,
    }
  );
};
