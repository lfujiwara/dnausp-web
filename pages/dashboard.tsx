import { CNAEChart } from "../components/charts/CNAEChart";
import cnae from "@json-assets/cnae.json";
import { cnaeToSecao } from "@domain/util/cnae-to-secao";
import { Box } from "@chakra-ui/react";
import { FilterAggregate } from "../components/charts/filters/filter-aggregate";
import { useEffect, useState } from "react";

const groupLabels2 = Object.values(cnae.secoes).reduce((acc, curr) => {
  acc[curr.id] = curr.descricao;
  return acc;
}, {} as { [key: string]: string });

export default function DashboardPage() {
  const [queryData, setQueryData] = useState({
    data: [],
    isLoading: false,
  });
  const [filter, setFilter] = useState<any>({});
  const onApply = (newFilter: any) => {
    setFilter({ ...filter, ...newFilter });
  };

  useEffect(() => {
    const params = new URLSearchParams();
    Object.keys(filter).forEach((key) => {
      params.append(key, filter[key]);
    });

    fetch(`http://localhost:3333/empresas/cnae/stats?${params.toString()}`)
      .then((res) => res.json())
      .then((_data) =>
        setQueryData({ ...queryData, data: _data, isLoading: false })
      );
  }, [filter]);

  return (
    <Box>
      <CNAEChart
        data={queryData.data}
        groupByFunction={(x) => cnaeToSecao(x.cnae) + ""}
        groupLabels={groupLabels2}
      />
      <FilterAggregate boxProps={{ p: "4" }} onApply={onApply} />
    </Box>
  );
}
