import { Select, SelectProps } from "@chakra-ui/react";
import { CnaeGroupingLevel } from "@domain/util/cnae-grouper";

export const CnaeGroupLevelSelect = (props: SelectProps) => (
  <Select {...props} defaultValue={CnaeGroupingLevel.SECAO}>
    {Object.keys(CnaeGroupingLevel).map((key) => (
      <option key={key} value={key}>
        {key}
      </option>
    ))}
  </Select>
);
