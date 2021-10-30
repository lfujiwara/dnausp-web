import React from "react";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("../components/geodata/map"), {
  ssr: false,
});

export default function geoData() {
  return (
    <div className="map-root">
      <MapWithNoSSR />
    </div>
  );
}
