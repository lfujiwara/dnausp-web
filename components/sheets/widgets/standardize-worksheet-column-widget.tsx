import { Text, Box, Button, Select } from "@chakra-ui/react";
import { WorksheetData } from "../../../lib/sheets/sheet";
import cols from "../../../lib/standardize/AvailableColumns";
import { useState } from "react";
import { IWidgetReturnValue } from "../../../lib/sheets/widgets";
import { StandardizeRevenueColumn } from "../../../lib/sheets/widgets/standardize-revenue-columns";
import { WidgetResultDownloader } from "./widget-result-downloader";

export const useStandardizeWorksheetColumnsWidget = (data: WorksheetData) => {
  const [colIndex, setColIndex] = useState(-1);
  const [processedData, setProcessedData] = useState<IWidgetReturnValue | null>(
    null
  );

  const handleColIndexChange = (evt: React.FormEvent<HTMLSelectElement>) => {
    evt.preventDefault();
    setColIndex(parseInt(evt.currentTarget.value));
  };

  const submit = () => {
    const result = StandardizeRevenueColumn.execute(data, colIndex);
    setProcessedData(result);
  };

  return {
    colIndex,
    handleColIndexChange,
    submit,
    result: processedData,
  };
};

function StandardizeWorksheetColumns({ data }: { data: WorksheetData }) {
  const { colIndex, handleColIndexChange, submit, result } =
    useStandardizeWorksheetColumnsWidget(data);
  let submitDisabled = colIndex === -1;
  return (
    <Box>
      <Text>Selecione uma coluna</Text>
      <Select value={colIndex} onChange={handleColIndexChange}>
        <option value={-1}>Selecione</option>
        {data.header.map((header, index) => {
          if (cols.includes(header))
            return (
              <option key={index} value={index}>
                {header}
              </option>
            );
        })}
      </Select>
      <Button
        w="full"
        mt="2"
        disabled={submitDisabled}
        onClick={() => submit()}
      >
        Executar
      </Button>
      {result && <WidgetResultDownloader {...result} header={data.header} />}
    </Box>
  );
}

export default StandardizeWorksheetColumns;
