import { Box } from "@chakra-ui/react";
import { useDistribuicaoGeneroPorInstitutoQuery } from "../../../backend/queries/all-queries";
import { ResponsiveBar } from "@nivo/bar";
import cnaeData from "@json-assets/cnae.json";
import Select from "react-select";
import {
  DistribuicaoGeneroPorInstitutoQueryOutput,
  Instituto,
  InstitutoNome,
} from "@dnausp/core";
import { useState } from "react";
import { Container, Text } from "@chakra-ui/layout";

const institutoOptions = Object.keys(Instituto).map((i) => ({
  value: i,
  label: `${InstitutoNome[i]} - ${i}`,
}));

const processData = (data: DistribuicaoGeneroPorInstitutoQueryOutput) => {
  return Object.keys(data).map((instituto) => {
    const total = data[instituto].reduce((acc, cur) => acc + cur.qtd, 0);

    return {
      instituto,
      ...data[instituto]?.reduce((acc, curr) => {
        acc[curr.genero] = (curr.qtd / total) * 100;
        return acc;
      }, {}),
    };
  });
};

export const DistribuicaoGeneroPorInstituto = () => {
  const [institutos, setInstitutos] = useState<Instituto[]>([
    Instituto.IME,
    Instituto.FEARP,
  ]);
  const query = useDistribuicaoGeneroPorInstitutoQuery();
  const queryData = query.data?.data;

  const processedData = processData(queryData || {}).filter((d) =>
    institutos.includes(d.instituto as Instituto)
  );

  return (
    <Box p="2">
      <Box w="full" h="60vh" maxH="100vh">
        <ResponsiveBar
          data={processedData}
          indexBy="instituto"
          keys={Object.values(cnaeData.secoes).map((s) => s.id)}
          label={(d) => d.id + ""}
          margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
          colors={{ scheme: "nivo" }}
          isInteractive
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Instituto",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Gênero",
            legendPosition: "middle",
            legendOffset: -40,
          }}
        />
      </Box>
      <Container pb={4}>
        {
          <Text mb="2">
            Exibindo dados de <strong>{query.data?.count}</strong> sócios
          </Text>
        }
        <Select
          placeholder="Selecione os institutos"
          options={institutoOptions}
          value={institutoOptions.filter((opt) =>
            institutos.includes(opt.value as Instituto)
          )}
          onChange={(value) =>
            setInstitutos(value.map((v) => v.value as Instituto))
          }
          isMulti
        />
      </Container>
    </Box>
  );
};
