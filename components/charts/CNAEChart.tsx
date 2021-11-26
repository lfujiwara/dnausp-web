import { FC } from "react";
import { Box } from "@chakra-ui/react";
import { ResponsivePie } from "@nivo/pie";

type CNAECountEntry = {
  cnae: string;
  count: string | number;
};

export interface CNAEChartProps {
  data: {
    cnae: string;
    count: number;
  }[];
  groupByFunction: (data: CNAECountEntry) => string;
  groupLabels: { [key: string]: string | undefined };
  fullSize?: boolean;
}

interface PieChartData {
  id: string;
  label: string;
  value: any;
}

const useGroupBy = (
  groupByFunction: (data: CNAECountEntry) => string,
  groupLabels: { [key: string]: string | undefined }
) => {
  const data: { [key: string]: PieChartData } = {};
  const add = (entry: CNAECountEntry) => {
    const groupId = groupByFunction(entry);
    const label = groupLabels[groupId];
    if (data[groupId])
      data[groupId].value += parseInt(entry.count.toString(), 10);
    else
      data[groupId] = {
        id: groupId,
        label: label || groupId,
        value: parseInt(entry.count.toString(), 10),
      };
  };
  return { data, add };
};

export const useCNAEChart = (props: CNAEChartProps) => {
  const grouping = useGroupBy(props.groupByFunction, props.groupLabels);
  props.data.forEach(grouping.add);
  return {
    data: Object.values(grouping.data),
  };
};

export const CNAEChart: FC<CNAEChartProps> = (props) => {
  const { data } = useCNAEChart(props);

  return (
    <Box w="full" h={props.fullSize ? "90vh" : "75vh"} maxH="100vh">
      <ResponsivePie
        data={data}
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
        arcLabel={(arc) => arc.data.value}
        id={(arc) => arc.label}
      />
    </Box>
  );
};
