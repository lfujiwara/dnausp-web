import Map from "../components/geodata/map";
import { Box, Center, Text } from "@chakra-ui/react";
export default function () {
  return (
    <div>
      <Center>Distribuição geográfica de empresas DNA USP</Center>
      <Center>
        <Map />
      </Center>
    </div>
  );
}
