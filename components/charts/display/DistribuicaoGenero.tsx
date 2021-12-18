import { Box } from "@chakra-ui/react";
import { useDistribuicaoGeneroQuery } from "../../../backend/queries/all-queries";
import { ResponsivePie } from "@nivo/pie";

export const DistribuicaoGenero = () => {
  const query = useDistribuicaoGeneroQuery();

  return (
    <Box>
      <Box w="full" h="60vh" maxH="100vh">
        <ResponsivePie
          data={(query.data || []).map(({ genero, qtd }) => ({
            id: genero,
            label: genero === "M" ? "Masculino" : "Feminino",
            value: qtd,
          }))}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
          id={(arc) => arc.label}
        />
      </Box>
    </Box>
  );
};
