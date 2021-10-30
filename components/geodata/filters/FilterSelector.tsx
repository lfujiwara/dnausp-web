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
  parent: "Todas",
  children: ["Incubadas", "Graduadas", "Direto ao mercado", "Ativas"],
};
export default function FilterSelector() {
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Filtrar empresas
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <IndeterminateSelector
            parent={options.parent}
            children={options.children}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
