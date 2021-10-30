import React from "react";
import dynamic from "next/dynamic";
// import Filters from "../components/geodata/filters/filters";
import FiltersContainer from "../components/geodata/filters/FiltersContainer";
import { Flex } from "@chakra-ui/layout";

const MapWithNoSSR = dynamic(() => import("../components/geodata/Map"), {
  ssr: false,
});

export default function geoData() {
  return (
    <div className="map-root">
      <Flex>
        <MapWithNoSSR />
        <FiltersContainer />
      </Flex>
    </div>
  );
}
