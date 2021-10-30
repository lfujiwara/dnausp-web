import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import municipios from "./resources/municipios_sp.json";

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
      lat: -23.56,
      lng: -46.72,
    },
    marker: {
      lat: 31.698956,
      lng: 76.732407,
    },
    zoom: 13,
  };

  updateMarker = (e: any) => {
    // const marker = e.marker;
    this.setState({
      marker: e.marker.getLatLng(),
    });
    console.log(e.marker.getLatLng());
  };

  render() {
    const position: [number, number] = [
      this.state.center.lat,
      this.state.center.lng,
    ];
    const markerPosition: [number, number] = [
      this.state.marker.lat,
      this.state.marker.lng,
    ];

    return (
      <>
        <MapContainer
          center={position}
          zoom={this.state.zoom}
          style={{
            width: "50%",
            height: "500px",
          }}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url={tileLayerUrl}
            subdomains="abcd"
            maxZoom={13}
          />
          <MarkerClusterGroup>
            {municipios.map((mun) => {
              return (
                <Marker position={[mun.lat, mun.lon]} key={mun.municipio}>
                  <Popup minWidth={90}>
                    <span>{mun.municipio}</span>
                    <br />
                    <span>Total de empresas: {mun.total_empresas}</span>
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
