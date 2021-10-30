import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import empresas from "./resources/empresas_cidade.json";

let DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
});

L.Marker.prototype.options.icon = DefaultIcon;

const tileLayerUrl =
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

export default class MyMap extends Component {
  state = {
    center: {
      lat: -12.0,
      lng: -50.0,
    },
    zoom: 4,
  };

  render() {
    const position: [number, number] = [
      this.state.center.lat,
      this.state.center.lng,
    ];

    return (
      <>
        <MapContainer
          center={position}
          zoom={this.state.zoom}
          className="map-panel"
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url={tileLayerUrl}
            subdomains="abcd"
            maxZoom={13}
          />
          <MarkerClusterGroup
            showCoverageOnHover={false}
            maxClusterRadius={100}
          >
            {empresas.map((emp, index) => {
              return (
                <Marker position={[emp.lat, emp.lon]} key={index}>
                  <Popup minWidth={90}>
                    <span>{emp.municipio}</span>
                    <br />
                    <span>{emp.grupo_cnae}</span>
                    <br />
                    <span>{emp.estagioDeIncubacao}</span>
                    <br />
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
}
