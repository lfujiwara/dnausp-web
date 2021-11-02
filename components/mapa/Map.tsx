import { useEffect } from "react";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import CompanyInfo from "./filters/CompanyInfo";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import empresas from "./resources/empresas_cidade.json";
import { MapFilter, filterCompany } from "../../lib/map/MapFilter";
import { useToast } from "@chakra-ui/react";

let DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
});

L.Marker.prototype.options.icon = DefaultIcon;

const tileLayerUrl =
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

export default function Map(props: any) {
  const state = {
    center: {
      lat: -12.0,
      lng: -50.0,
    },
    zoom: 4,
  };

  const toast = useToast();
  useEffect(() => {
    if (filteredCompanies.length == 0) {
      if (!toast.isActive("empty-set-toast")) {
        toast({
          id: "empty-set-toast",
          title: "Nenhuma empresa encontrada",
          description:
            "Os filtros selecionados não contemplam nenhuma empresa cadastrada",
          status: "error",
          isClosable: true,
          duration: 5000,
        });
      }
    }
  });
  const filters: MapFilter = props.filters;

  const filteredCompanies = empresas.filter((emp) =>
    filterCompany(emp, filters)
  );

  const position: [number, number] = [state.center.lat, state.center.lng];
  return (
    <>
      <MapContainer center={position} zoom={state.zoom} className="map-panel">
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={tileLayerUrl}
          subdomains="abcd"
          maxZoom={13}
        />
        <MarkerClusterGroup showCoverageOnHover={false} maxClusterRadius={100}>
          {filteredCompanies.map((emp, index) => {
            return (
              <Marker position={[emp.lat, emp.lon]} key={index}>
                <Popup minWidth={90}>
                  <CompanyInfo info={emp} />
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>
      <style jsx>
        {`
          .map-root {
            height: 100%;
          }
          .leaflet-container {
            height: 400px !important;
            width: 80%;
            margin: 0 auto;
          }
        `}
      </style>
    </>
  );
}
