import {
  Button,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useRangeSlider,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { Card } from "../../layout/elements/Card";
import { FilterByFoundedInYearRange } from "../../../lib/sheets/widgets/filter-by-founded-in-year-range";
import { IWidgetReturnValue } from "../../../lib/sheets/widgets";
import { Select } from "@chakra-ui/select";
import { WidgetResultDownloader } from "./widget-result-downloader";
import { WorksheetData } from "../../../lib/sheets/sheet";
import { sheetToCsv } from "../../../lib/sheets/sheet-to-csv";

export const useFilterByFoundedInYearRangeWidget = (
  data: WorksheetData,
  defaultValues = {
    min: 1900,
    max: new Date().getFullYear(),
    yearColIndex: "0",
  }
) => {
  const [min, setMin] = useState<number>(defaultValues.min);
  const [max, setMax] = useState<number>(defaultValues.max);
  const [yearColIndex, setYearColIndex] = useState<string>(
    defaultValues.yearColIndex
  );
  const [processedData, setProcessedData] = useState<IWidgetReturnValue | null>(
    null
  );

  const _setMin = (_value: any) => {
    const value = parseInt(_value, 10);
    setMin(value);
  };

  const handleMinChange = (evt: React.FormEvent<HTMLInputElement>) => {
    evt.preventDefault();
    _setMin(evt.currentTarget.value);
  };

  const _setMax = (_value: any) => {
    const value = parseInt(_value, 10);
    setMax(value);
  };

  const handleMaxChange = (evt: React.FormEvent<HTMLInputElement>) => {
    evt.preventDefault();
    _setMax(evt.currentTarget.value);
  };

  const _setYearColIndex = (_value: string) => {
    const value = parseInt(_value, 10);
    setYearColIndex(value.toString());
  };

  const handleYearColIndexChange = (
    evt: React.FormEvent<HTMLSelectElement>
  ) => {
    evt.preventDefault();
    _setYearColIndex(evt.currentTarget.value);
  };

  const submit = () => {
    if (min !== null && max !== null && yearColIndex !== null) {
      const result = FilterByFoundedInYearRange.execute(
        data,
        min,
        max,
        parseInt(yearColIndex, 10)
      );
      setProcessedData(result);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit();
  };

  const isError = max < min;
  const isDisabled =
    min === null || max === null || yearColIndex === null || isError;

  return {
    min,
    max,
    yearColIndex,
    setMin: _setMin,
    setMax: _setMax,
    setYearColIndex: _setYearColIndex,
    handleMinChange,
    handleMaxChange,
    handleYearColIndexChange,
    submit,
    handleSubmit,
    isDisabled,
    isError,
    result: processedData,
  };
};

export const FilterByFoundedInYearRangeWidget = ({
  data,
}: {
  data: WorksheetData;
}) => {
  const {
    min,
    max,
    yearColIndex,
    setMin,
    setMax,
    handleYearColIndexChange,
    isDisabled,
    submit,
    result,
  } = useFilterByFoundedInYearRangeWidget(data);

  return (
    <Card>
      <Text fontSize="lg" fontWeight="semibold" mb="2">
        Filtrar empresas por ano de fundação
      </Text>
      <Select value={yearColIndex || ""} onChange={handleYearColIndexChange}>
        <option>Selecione a coluna de ano</option>
        {data.header.map((col, index) => {
          return (
            <option key={index} value={index}>
              {col}
            </option>
          );
        })}
      </Select>
      <HStack justify="space-between" mt="2">
        <NumberInput
          min={1822}
          max={new Date().getFullYear()}
          value={min}
          onChange={(_, n) => setMin(n)}
          placeholder="Ano mínimo"
        >
          <NumberInputField />
        </NumberInput>
        <NumberInput
          min={1822}
          max={new Date().getFullYear()}
          value={max}
          onChange={(_, n) => setMax(n)}
        >
          <NumberInputField placeholder="Ano máximo" />
        </NumberInput>
      </HStack>
      <Button mt="2" w="full" disabled={isDisabled} onClick={() => submit()}>
        Executar
      </Button>
      {result && <WidgetResultDownloader {...result} header={data.header} />}
    </Card>
  );
};
