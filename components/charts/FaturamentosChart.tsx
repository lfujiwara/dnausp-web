import { Faturamento } from "@dnausp/core";
import { Box } from "@chakra-ui/react";
import { BarDatum, ResponsiveBar } from "@nivo/bar";

export const FaturamentosChart = ({
  faturamentos: _faturamentos,
}: {
  faturamentos: Faturamento[];
}) => {
  const faturamentos = [..._faturamentos].sort(
    (a, b) => a.anoFiscal - b.anoFiscal
  );

  const data = faturamentos.map((f) => ({
    "Ano fiscal": f.anoFiscal.toString(),
    Faturamento: f.valor / 100,
  }));

  const fmt = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <Box w="96" h="96">
      <ResponsiveBar
        keys={["Faturamento"]}
        valueFormat={fmt.format}
        indexBy="Ano fiscal"
        data={data}
        colors={{ scheme: "nivo" }}
        {...({} as BarDatum)}
      />
    </Box>
  );
};
