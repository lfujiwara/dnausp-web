import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import IndeterminateSelector from "./IndeterminateSelector";

const options = {
  parent: "Todas as empresas",
  subgroup: ["Incubadas", "Graduadas", "Direto para o mercado", "Ativas"],
};
export default function FilterSelector(props: any) {
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Filtrar marcadores
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <IndeterminateSelector
            parent={options.parent}
            subgroup={options.subgroup}
            updateFn={props.updateFn}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
