import { useState } from "react";
import { useDistribuicaoCnaePorAnoFundacaoQuery } from "../../../backend/queries/all-queries";
import { useGroupCnaeDistribution } from "../../../hooks/useGroupCnae";
import { cnaeLabeler } from "@domain/util/cnae-labeler";
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
import { ResponsivePie } from "@nivo/pie";
import { Container, HStack } from "@chakra-ui/layout";
import { AccordionHelper } from "../AccordionHelper";
import { CnaeGroupLevelSelect } from "../CnaeGroupLevelSelect";
import { CnaeGroupingLevel, groupCnaeObject } from "@domain/util/cnae-grouper";
import { mergeMultipleObjects } from "@common/merge-objects";

export const DistribuicaoCNAEPorAnoFundacao = () => {
  const query = useDistribuicaoCnaePorAnoFundacaoQuery();

  const [yearDelta, setYearDelta] = useState(0);
  const [useAccumulated, setUseAccumulated] = useState(false);

  const minYear = query.data?.slice(0, 1)?.[0]?.ano || 0;
  const maxYear = query.data?.slice(-1)[0]?.ano || 0;

  const maxRange = maxYear - minYear;
  const selectedYear = minYear + yearDelta;

  const mergedData = mergeMultipleObjects(
    query.data
      ?.filter(({ ano }) => ano <= selectedYear)
      .map((d) => d.distribuicao) || []
  );
  const currentData =
    query.data?.find(({ ano }) => ano === selectedYear)?.distribuicao || {};

  const { level, setLevel } = useGroupCnaeDistribution({});

  const chartData = Object.entries(
    groupCnaeObject(useAccumulated ? mergedData : currentData, level)
  ).map(([id, value]) => ({
    value,
    id,
    label: `${id} - ${cnaeLabeler(id)}`,
  }));

  return (
    <Box>
      <Box w="full" h="60vh" maxH="100vh">
        <ResponsivePie
          data={chartData}
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
      <Container pb="4">
        <AccordionHelper
          content={[
            {
              label: "Agrupamento CNAE",
              content: (
                <CnaeGroupLevelSelect
                  value={level}
                  onChange={(evt) =>
                    setLevel((evt.target.value + "") as CnaeGroupingLevel)
                  }
                />
              ),
            },
            {
              label: "Ano de fundação",
              content: (
                <VStack>
                  <HStack align="center" my="4" alignSelf="flex-start">
                    <Switch
                      value={useAccumulated.toString()}
                      onChange={(evt) =>
                        setUseAccumulated(Boolean(evt.target.checked))
                      }
                    />
                    <Text>Exibir dados acumulados (desde o ano inicial)</Text>
                  </HStack>
                  <Slider
                    defaultValue={0}
                    min={0}
                    max={maxRange}
                    step={1}
                    onChange={(val) => setYearDelta(Number(val))}
                  >
                    <SliderTrack bg="red.100">
                      <Box position="relative" right={10} />
                      <SliderFilledTrack bg="tomato" />
                    </SliderTrack>
                    <SliderThumb boxSize={6} />
                  </Slider>
                  <Text>{selectedYear}</Text>
                </VStack>
              ),
            },
          ]}
        />
      </Container>
    </Box>
  );
};
