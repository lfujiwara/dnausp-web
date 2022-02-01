import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useDistribuicaoGeneroPorAnoFundacaoQuery } from "../../../backend/queries/all-queries";
import { ResponsivePie } from "@nivo/pie";
import { useAnoSelector } from "../../../hooks/useAnoSelector";
import { useState } from "react";
import { AccordionHelper } from "../AccordionHelper";
import { Container, HStack } from "@chakra-ui/layout";

export const DistribuicaoGeneroPorAnoFundacao = () => {
  const query = useDistribuicaoGeneroPorAnoFundacaoQuery();
  const queryData = query.data?.data;

  const minY =
    queryData?.reduce((a, { anoFundacao }) => Math.min(anoFundacao, a), 1930) ??
    0;
  const maxY =
    queryData?.reduce((a, { anoFundacao }) => Math.max(anoFundacao, a), 1930) ??
    0;

  const sel = useAnoSelector(minY, maxY);

  const [useAccumulatedData, setUseAccumulatedData] = useState(false);
  let data =
    queryData?.find((d) => d.anoFundacao === sel.selectedYear)?.distribuicao ||
    [];
  if (queryData && useAccumulatedData)
    data = Object.entries(
      queryData
        .filter(({ anoFundacao }) => anoFundacao <= sel.selectedYear)
        .map((p) => p.distribuicao)
        .flat()
        .reduce(
          (acc, { genero, qtd }) => {
            if (genero === "M") acc.M += qtd;
            if (genero === "F") acc.F += qtd;
            return acc;
          },
          { M: 0, F: 0 }
        )
    ).map(([genero, qtd]) => ({ genero, qtd }));

  return (
    <Box>
      <Box w="full" h="60vh" maxH="100vh">
        <ResponsivePie
          data={(data || []).map(({ genero, qtd }) => ({
            id: genero,
            label: genero === "M" ? "Masculino" : "Feminino",
            value: qtd,
          }))}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
          id={(arc) => arc.label}
        />
      </Box>

      <Container pb={4}>
        {query.data && (
          <Text mb="2">
            Exibindo dados de <strong>{query.data?.count}</strong> sócios
          </Text>
        )}
        <AccordionHelper
          content={[
            {
              label: "Ano de fundação",
              content: (
                <VStack>
                  <HStack align="center" my="4" alignSelf="flex-start">
                    <Switch
                      value={useAccumulatedData.toString()}
                      onChange={(evt) =>
                        setUseAccumulatedData(Boolean(evt.target.checked))
                      }
                    />
                    <Text>Exibir dados acumulados (desde o ano inicial)</Text>
                  </HStack>
                  <Slider
                    defaultValue={0}
                    min={0}
                    max={sel.maxYear - sel.minYear}
                    step={1}
                    onChange={(val) => sel.setYearDelta(Number(val))}
                  >
                    <SliderTrack bg="red.100">
                      <Box position="relative" right={10} />
                      <SliderFilledTrack bg="tomato" />
                    </SliderTrack>
                    <SliderThumb boxSize={6} />
                  </Slider>
                  <Text>{sel.selectedYear}</Text>
                </VStack>
              ),
            },
          ]}
        />
      </Container>
    </Box>
  );
};
