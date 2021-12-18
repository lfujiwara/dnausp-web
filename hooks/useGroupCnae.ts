import { CnaeGroupingLevel, groupCnaeObject } from "@domain/util/cnae-grouper";
import { useState } from "react";

export const useGroupCnaeDistribution = (data: { [k: string]: number }) => {
  const [level, setLevel] = useState<CnaeGroupingLevel>(
    CnaeGroupingLevel.SECAO
  );

  return { level, setLevel, data: groupCnaeObject(data, level) };
};
