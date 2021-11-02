import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Checkbox,
  Tooltip,
} from "@chakra-ui/react";
import { Box, SimpleGrid, Text } from "@chakra-ui/layout";
import {
  RowValidator,
  RowValidatorEntry,
  SheetValidator,
  SheetValidatorBuilder,
} from "../../../lib/sheets/validators/validator-base";

import { Button } from "@chakra-ui/button";
import { RowValidatorEntries } from "../../../lib/sheets/validators/row";
import { ValidatorResultDownloader } from "./validator-result-downloader";
import { WorksheetData } from "../../../lib/sheets/sheet";
import { useState } from "react";

export const useValidatorWidget = () => {
  const [state, setState] = useState<RowValidatorEntry[]>([]);

  const validators = state.map((entry) => entry.validator);

  const validate = new SheetValidatorBuilder(validators).build();
  const validateWorksheet = (sheet: WorksheetData) => {
    const rows = sheet.rows.map((row) =>
      row.reduce((a, b, i) => ({ ...a, [sheet.header[i]]: b }), {})
    );
    console.log(rows);
    return validate(rows);
  };

  const addValidator = (validatorName: any) => {
    const nextState = [
      ...state,
      ...RowValidatorEntries.filter(({ name }) => name === validatorName),
    ].reduce((acc, curr) => {
      if (!acc.some((e) => e.name === curr.name)) {
        acc.push(curr);
      }
      return acc;
    }, [] as RowValidatorEntry[]);
    setState(nextState);
  };

  const removeValidator = (validatorName: any) => {
    const nextState = state.filter(({ name }) => name !== validatorName);
    setState(nextState);
  };

  return {
    validators: state,
    addValidator,
    removeValidator,
    validate,
    validateWorksheet,
  };
};

export const useValidate = (
  validateFn: SheetValidator.Spec,
  data: WorksheetData
) => {
  const [state, setState] = useState<SheetValidator.Response | undefined>(
    undefined
  );

  const update = () => {
    const rows: RowValidator.Request[] = data.rows.map((row) =>
      row.reduce((a, b, i) => ({ ...a, [data.header[i]]: b }), {})
    );
    validateFn(rows).then((res) => setState(res));
  };

  return {
    state,
    update,
  };
};

export const ValidatorWidget = (data: WorksheetData) => {
  const w = useValidatorWidget();
  const { state, update } = useValidate(w.validate, data);

  return (
    <Box>
      <Accordion allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Validadores disponíveis
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <SimpleGrid minChildWidth="80px">
              {RowValidatorEntries.map(({ name, description }) => (
                <Checkbox
                  key={name}
                  isChecked={w.validators.some((e) => e.name === name)}
                  onChange={() => {
                    if (w.validators.some((e) => e.name === name)) {
                      w.removeValidator(name);
                    } else {
                      w.addValidator(name);
                    }
                  }}
                >
                  <Tooltip label={description}>
                    <Text>{name}</Text>
                  </Tooltip>
                </Checkbox>
              ))}
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      {state && <ValidatorResultDownloader {...state} />}
      <Button mt="4" onClick={() => update()} w="full" p="4">
        Validar
      </Button>
    </Box>
  );
};
