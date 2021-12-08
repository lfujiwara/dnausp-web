import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { WrapRequireBackendAuth } from "@auth/backend/require-backend-auth";
import Head from "next/head";
import { WrappedCNAEChart } from "../components/charts/wrapped/WrappedCNAEChart";
import { WrappedCNAEChartYearly } from "../components/charts/wrapped/WrappedCNAEChartYearly";

function DashboardPage() {
  return (
    <>
      <Head>
        <title>Relatório</title>
      </Head>
      <Tabs>
        <TabList>
          <Tab>Distribuição CNAE</Tab>
          <Tab>Distribuição CNAE (por ano/acumulado)</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <WrappedCNAEChart />
          </TabPanel>
          <TabPanel>
            <WrappedCNAEChartYearly />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

const DashboardPageWrapped = WrapRequireBackendAuth(DashboardPage);
export default DashboardPageWrapped;
