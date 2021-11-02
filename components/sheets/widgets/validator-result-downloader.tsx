import { IconButton, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

import { FaDownload } from "react-icons/fa";
import { RowValidator } from "../../../lib/sheets/validators/validator-base";
import { sheetToCsv } from "../../../lib/sheets/sheet-to-csv";

export const ValidatorResultDownloader = ({
  ok,
  err: _err,
}: {
  ok: RowValidator.ResultValue[];
  err: RowValidator.ResultErr[];
}) => {
  const makeDownload = (data: RowValidator.ResultValue[], filename: string) => {
    const header = [];
    const rows = [];

    const keys = Object.keys(data[0]);
    header.push(...keys);
    rows.push(...data.map((x) => keys.map((y) => x[y] + "")));

    sheetToCsv(
      {
        header,
        rows,
      },
      filename
    );
  };

  const err = _err.map((row) => ({ errors: row.errors.join(";"), ...row.row }));

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
          <Td>{ok.length}</Td>
          <Td>
            <IconButton
              aria-label="Download"
              icon={<FaDownload />}
              onClick={() => makeDownload(ok, "ok.csv")}
            />
          </Td>
        </Tr>
        <Tr>
          <Td>Erros</Td>
          <Td>{err.length}</Td>
          <Td>
            <IconButton
              aria-label="Download"
              icon={<FaDownload />}
              onClick={() => makeDownload(err, "erros.csv")}
            />
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};
