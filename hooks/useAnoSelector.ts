import { useState } from "react";

export const useAnoSelector = (min, max) => {
  const [yearDelta, setYearDelta] = useState(0);

  const minYear = min || 0;
  const maxYear = max || 0;

  const maxRange = maxYear - minYear;
  const selectedYear = minYear + yearDelta;

  return { minYear, maxYear, selectedYear, setYearDelta, maxRange };
};
