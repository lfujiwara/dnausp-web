import {
  Box,
  Container,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Switch,
  VStack,
} from "@chakra-ui/react";
import { Center, HStack, Text } from "@chakra-ui/layout";
import { WrappedCNAEChartFun } from "./WrappedCNAEChartFun";
import { useCNAEStatsQueryYearly } from "../../../backend/queries/CNAEStatsQueryYearly";
import { useMemo, useState } from "react";

type Datum = {
  cnae: string;
  count: number;
};

const datumListToObj = (datumList: Datum[]) => {
  const obj: { [key: string]: number } = {};
  datumList.forEach((datum) => {
    obj[datum.cnae] = datum.count;
  });
  return obj;
};

const mergeDatumLists = (d1: Datum[], d2: Datum[]) => {
  const obj1 = datumListToObj(d1);
  const obj2 = datumListToObj(d2);
  const obj3: { [key: string]: number } = {};

  const keySet = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
  keySet.forEach((key) => {
    obj3[key] = (obj1[key] || 0) + (obj2[key] || 0);
  });

  return Object.keys(obj3).map((key) => ({ cnae: key, count: obj3[key] }));
};

export function WrappedCNAEChartYearly() {
  const query = useCNAEStatsQueryYearly();
  const [yearDelta, setYearDelta] = useState(0);
  const [useAccumulated, setUseAccumulated] = useState(false);

  const data = query.data?.sort((a, b) => a.year - b.year);
  const accumulatedData = useMemo(() => {
    if (!data) return undefined;
    let acc: Datum[] = [];

    return data.map(({ year, value }) => {
      acc = mergeDatumLists(acc, value);
      return {
        year,
        value: acc,
      };
    });
  }, [data]);

  const minYear = data?.slice(0, 1)?.[0]?.year || 0;
  const maxYear = data?.slice(-1)[0]?.year || 0;

  const maxRange = maxYear - minYear;
  const selectedYear = minYear + yearDelta;
  const yearData = (useAccumulated ? accumulatedData : data)?.find(
    (item) => item.year === selectedYear
  );

  return (
    <Box p="2">
      <Center maxW="100vw">
        <Container maxW="container.md">
          <Heading>Distribuição CNAE (por ano) - Empresas DNA USP</Heading>
        </Container>
      </Center>
      <WrappedCNAEChartFun
        data={yearData?.value || []}
        isLoading={query.isLoading}
      >
        <VStack>
          <HStack align="center" my="4" alignSelf="flex-start">
            <Switch
              value={useAccumulated.toString()}
              onChange={(evt) => setUseAccumulated(Boolean(evt.target.checked))}
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
      </WrappedCNAEChartFun>
    </Box>
  );
}
