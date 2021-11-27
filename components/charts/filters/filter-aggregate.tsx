import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { Box, BoxProps, HStack, Text } from "@chakra-ui/layout";
import {
  AnoDeFundacaoChartFilter,
  useAnoDeFundacaoChartFilter,
} from "./ano-de-fundacao-chart-filter";
import { Button } from "@chakra-ui/button";

export const FilterAggregate = ({
  boxProps = {},
  onApply = () => undefined,
}: {
  boxProps?: BoxProps;
  onApply?: (filters: { [key: string]: any }) => any;
}) => {
  const anoDeFundacao = useAnoDeFundacaoChartFilter();

  const filters = {
    anoMin: anoDeFundacao.value.min,
    anoMax: anoDeFundacao.value.max,
  };

  return (
    <Box {...boxProps}>
      <Text fontSize="xl" mb="2" fontWeight="medium">
        Filtrar
      </Text>
      <Accordion allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Ano de fundação
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <AnoDeFundacaoChartFilter {...anoDeFundacao} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <HStack justify="flex-end" mt="2">
        <Button colorScheme="blue" onClick={() => onApply(filters)}>
          Aplicar
        </Button>
      </HStack>
    </Box>
  );
};
