import FilterSelector from "./FilterSelector";
import { Text } from "@chakra-ui/react";

export default function FiltersContainer(props: any) {
  return (
    <div className="filters-panel">
      <FilterSelector updateFn={props.updateFn} />

      <Text color="gray.500" fontSize="sm">
        * São mostradas no mapa as empresas cujo campo Cidade consta na
        planilha.
      </Text>
    </div>
  );
}
