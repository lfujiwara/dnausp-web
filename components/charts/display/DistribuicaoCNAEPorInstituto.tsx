import { Box, UnorderedList } from "@chakra-ui/react";
import { useDistribuicaoCnaePorInstituto } from "../../../backend/queries/all-queries";
import { ResponsiveBar } from "@nivo/bar";
import {
  DistribuicaoCnaePorInstitutoQueryOutput,
  Instituto,
  InstitutoNome,
} from "@dnausp/core";
import { CnaeGroupingLevel, groupCnaeObject } from "@domain/util/cnae-grouper";
import cnaeData from "@json-assets/cnae.json";
import { useState } from "react";
import Select from "react-select";
import { cnaeLabeler } from "@domain/util/cnae-labeler";
import { AccordionHelper } from "../AccordionHelper";
import { Container, Text } from "@chakra-ui/layout";

const institutoOptions = Object.keys(Instituto).map((i) => ({
  value: i,
  label: `${InstitutoNome[i]} - ${i}`,
}));

const processData = (
  data: DistribuicaoCnaePorInstitutoQueryOutput,
  level: CnaeGroupingLevel.SECAO
) => {
  return Object.entries(data).map(([instituto, distribuicao]) => {
    const obj = groupCnaeObject(distribuicao, level);
    const total = Object.values(obj).reduce((a, b) => a + b, 0);
    Object.keys(obj).forEach((cnae) => {
      obj[cnae] = (obj[cnae] / total) * 100;
    });

    return {
      instituto,
      ...obj,
    };
  });
};

export const DistribuicaoCNAEPorInstituto = () => {
  const [institutos, setInstitutos] = useState<Instituto[]>([
    Instituto.IME,
    Instituto.FEARP,
  ]);
  const query = useDistribuicaoCnaePorInstituto();
  const data = query.data?.data || {};
  const processedData = processData(data, CnaeGroupingLevel.SECAO).filter(
    ({ instituto }) => institutos.includes(instituto as Instituto)
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
            legend: "CNAE",
            legendPosition: "middle",
            legendOffset: -40,
          }}
        />
      </Box>
      <Container pb="4">
        {query.data && (
          <Text mb="2">
            Exibindo dados de <strong>{query.data?.count}</strong> empresas
          </Text>
        )}
        <AccordionHelper
          content={[
            {
              label: "Legenda",
              content: (
                <UnorderedList>
                  {Object.keys(cnaeData.secoes)
                    .sort()
                    .map((s) => (
                      <li key={s}>
                        {s} - {cnaeLabeler(s)}
                      </li>
                    ))}
                </UnorderedList>
              ),
            },
          ]}
        />
        <Box h="2" />
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
