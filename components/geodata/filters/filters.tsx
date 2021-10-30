import { Box } from "@chakra-ui/react";
import FilterSelector from "./FilterSelector";

export default function Filters() {
  return (
    <Box border="1px" borderColor="blue.600" className="filters-panel">
      <FilterSelector />
    </Box>
  );
}
