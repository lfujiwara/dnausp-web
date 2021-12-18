import { WrapRequireBackendAuth } from "@auth/backend/require-backend-auth";
import Head from "next/head";
import { Box, Select } from "@chakra-ui/react";
import { charts } from "../components/charts/display/charts";
import { useState } from "react";

function DashboardPage() {
  const [chart, setChart] = useState(charts.find(() => true)?.name || "");

  const Component = charts.find(({ name }) => name === chart)?.chart;

  return (
    <>
      <Head>
        <title>Gráficos</title>
      </Head>
      <Box p={4}>
        <Select
          placeholder="Selecione o gráfico"
          value={chart}
          onChange={(evt) => setChart(evt.target.value)}
        >
          {charts.map(({ name }) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </Select>
        {Component && <Component />}
      </Box>
    </>
  );
}

const DashboardPageWrapped = WrapRequireBackendAuth(DashboardPage);
export default DashboardPageWrapped;
