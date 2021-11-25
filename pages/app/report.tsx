import cnae from "@json-assets/cnae.json";
import { cnaeToSecao } from "@domain/util/cnae-to-secao";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CNAEChart } from "../../components/charts/CNAEChart";
import { FilterAggregate } from "../../components/charts/filters/filter-aggregate";
import { Select } from "@chakra-ui/select";
import { WrapRequireBackendAuth } from "@auth/backend/require-backend-auth";
import { useBackendAuthManager } from "@auth/backend/use-backend-auth-manager";

const groupingMethods = [
  {
    label: "Secao",
    labels: Object.values(cnae.secoes).reduce((acc, curr) => {
      acc[curr.id] = curr.descricao;
      return acc;
    }, {} as { [key: string]: string }),
    fn: (x: any) => cnaeToSecao(x.cnae) + "",
  },
  {
    label: "Divisao",
    labels: Object.values(cnae.divisoes).reduce((acc, curr) => {
      acc[curr.id] = curr.descricao;
      return acc;
    }, {} as { [key: string]: string }),
    fn: (x: any) => x.cnae.toString().substring(0, 2),
  },
];

const groupLabels2 = Object.values(cnae.secoes).reduce((acc, curr) => {
  acc[curr.id] = curr.descricao;
  return acc;
}, {} as { [key: string]: string });

function DashboardPage() {
  const auth = useBackendAuthManager()

  const [queryData, setQueryData] = useState({
    data: [],
    isLoading: false,
  });
  const [filter, setFilter] = useState<any>({});
  const onApply = (newFilter: any) => {
    setFilter({...filter, ...newFilter});
  };

  const [groupMethod, setGroupMethod] = useState(groupingMethods[0]);

  useEffect(() => {
    const params = new URLSearchParams();
    Object.keys(filter).forEach((key) => {
      params.append(key, filter[key]);
    });

    fetch(`http://localhost:3333/empresas/cnae/stats?${params.toString()}`, {
      headers: {
        authorization: `Bearer ${auth.token}`,
      }
    })
      .then((res) => res.json())
      .then((_data) =>
        setQueryData({...queryData, data: _data, isLoading: false})
      );
  }, [filter]);

  return (
    <Box>
      <Select
        onChange={(evt) =>
          setGroupMethod(
            groupingMethods.find((g) => g.label === evt.target.value) ||
            groupingMethods[0]
          )
        }
        value={groupMethod.label}
      >
        {groupingMethods.map((method) => (
          <option key={method.label} value={method.label}>
            {method.label}
          </option>
        ))}
      </Select>
      <CNAEChart
        data={queryData.data}
        groupByFunction={groupMethod.fn}
        groupLabels={groupMethod.labels}
      />
      <FilterAggregate boxProps={{p: "4"}} onApply={onApply}/>
    </Box>
  );
}

const DashboardPageWrapped = WrapRequireBackendAuth(DashboardPage);
export default DashboardPageWrapped;
