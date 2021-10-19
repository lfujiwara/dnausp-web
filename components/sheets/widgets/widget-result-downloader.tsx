import {
  IconButton,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { FaDownload } from "react-icons/fa";
import { IWidgetReturnValue } from "../../../lib/sheets/widgets";
import { sheetToCsv } from "../../../lib/sheets/sheet-to-csv";

export const WidgetResultDownloader = ({
  matched,
  unmatched,
  errors,
  header,
}: IWidgetReturnValue & { header: string[] }) => {
  const makeDownload = (rows: string[][], filename: string) => () => {
    sheetToCsv({ header, rows }, filename);
  };

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Situação</Th>
          <Th>Quantidade</Th>
          <Th>Download</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Compatíveis</Td>
          <Td>{matched.length}</Td>
          <Td>
            <IconButton
              aria-label="Download"
              icon={<FaDownload />}
              onClick={makeDownload(matched, "compativeis.csv")}
            />
          </Td>
        </Tr>
        <Tr>
          <Td>Incompatíveis</Td>
          <Td>{unmatched.length}</Td>
          <Td>
            <IconButton
              aria-label="Download"
              icon={<FaDownload />}
              onClick={makeDownload(unmatched, "incompativeis.csv")}
            />
          </Td>
        </Tr>
        <Tr>
          <Td>Erros</Td>
          <Td>{errors.length}</Td>
          <Td>
            <IconButton
              aria-label="Download"
              icon={<FaDownload />}
              onClick={makeDownload(errors, "erros.csv")}
            />
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};
