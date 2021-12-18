import { FC, ReactNode } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

export type AccordionHelperProps = {
  content: {
    label: string;
    content: ReactNode;
  }[];
};
export const AccordionHelper: FC<AccordionHelperProps> = ({ content }) => {
  return (
    <Accordion allowMultiple>
      {content.map(({ label, content: entryContent }) => (
        <AccordionItem key={label}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {label}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={2}>{entryContent}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
