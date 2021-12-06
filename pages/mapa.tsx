import React from "react";
import MapDashboard from "../components/mapa/MapDashboard";
import Head from "next/head";

export default function geoData() {
  return (
    <>
      <Head>
        <title>Mapa</title>
      </Head>
      <MapDashboard />
    </>
  );
}
