import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import { Box } from "@chakra-ui/layout";

import brEstados from "./resources/br_estados.json";

const marker = {
  markerOffset: 25,
  name: "Brasilia",
  coordinates: [-47.8825, -15.7942],
};
export default function Map() {
  return (
    <Box w="50%" border="1px" borderColor="gray.200">
      <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [55, 15, 0],
          scale: 850,
        }}
      >
        <ZoomableGroup zoom={1}>
          <Geographies geography={brEstados}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#DDD"
                  stroke="#888"
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#BBB", outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
          <Marker key={marker.name} coordinates={marker.coordinates}>
            <circle r={1} fill="#F00"></circle>
          </Marker>
        </ZoomableGroup>
      </ComposableMap>
    </Box>
  );
}
