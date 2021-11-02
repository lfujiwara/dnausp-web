import FiltersContainer from "./filters/FiltersContainer";
import { Flex } from "@chakra-ui/layout";
import { MapFilter } from "../../lib/map/MapFilter";
import dynamic from "next/dynamic";
import { useState } from "react";

const MapWithNoSSR = dynamic(() => import("./Map"), {
  ssr: false,
});

const filtersDefaultValue = {
  incubated: true,
  graduated: true,
  nonIncubated: true,
  active: true,
} as MapFilter;

export default function MapDashboard(props: any) {
  const [mapFilters, setMapFilters] = useState(filtersDefaultValue);

  function updateMapFilters(e: any) {
    const filters = {
      incubated: e[0],
      graduated: e[1],
      nonIncubated: e[2],
      active: e[3],
    };
    setMapFilters(filters);
  }
  return (
    <div className="map-root">
      <Flex>
        <MapWithNoSSR filters={mapFilters} />
        <FiltersContainer updateFn={updateMapFilters} />
      </Flex>
    </div>
  );
}
