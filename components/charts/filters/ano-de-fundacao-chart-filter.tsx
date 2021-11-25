import { HStack } from "@chakra-ui/layout";
import { ChangeEvent, FC, useState } from "react";
import { Input } from "@chakra-ui/input";

export const useAnoDeFundacaoChartFilter = () => {
  const [value, setValue] = useState({
    min: new Date().getFullYear() - 10 + "",
    max: new Date().getFullYear() + "",
  });

  return { value, setValue };
};

export const AnoDeFundacaoChartFilter: FC<{
  value: { min: string; max: string };
  setValue: (value: { min: string; max: string }) => void;
}> = ({ value, setValue }) => {
  const notNanOrUndefined = (x: number | string) =>
    isNaN(+x) ? "0" : x.toString();

  const setMin = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      min: notNanOrUndefined(parseInt(evt.target.value, 10)),
    });
  };

  const setMax = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      max: notNanOrUndefined(parseInt(evt.target.value, 10)),
    });
  };

  return (
    <HStack spacing="2">
      <Input type="number" value={value.min} onChange={setMin} />
      <Input type="number" value={value.max} onChange={setMax} />
    </HStack>
  );
};
