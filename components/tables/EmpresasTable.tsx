import { FC, useMemo } from "react";
import { CNPJ, Empresa } from "@dnausp/core";
import { Column, Row, usePagination, useSortBy, useTable } from "react-table";
import {
  Box,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { HStack, Text } from "@chakra-ui/layout";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

export const EmpresasTable: FC<{ empresas: Empresa[] }> = ({
  empresas = [],
}) => {
  const data = useMemo(
    () =>
      empresas.map((e) => ({
        cnpj: e.estrangeira
          ? `Exterior ${e.idEstrangeira}`.trim()
          : CNPJ.formatCNPJ(e.cnpj?.get() + ""),
        nomeFantasia: e.nomeFantasia,
        razaoSocial: e.razaoSocial,
      })),
    [empresas]
  );

  const columns = useMemo(
    () =>
      [
        {
          Header: "CNPJ",
          accessor: "cnpj",
        },
        {
          Header: "Nome fantasia",
          accessor: "nomeFantasia",
        },
        {
          Header: "Razão social",
          accessor: "razaoSocial",
        },
      ] as Column<{
        cnpj: string;
        nomeFantasia: string | undefined;
        razaoSocial: string | undefined;
      }>[],
    []
  );

  const tbl = useTable({ data, columns }, useSortBy, usePagination);

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow } = tbl;

  const pagination: {
    page: Array<Row<typeof data[0]>>;
    pageCount: number;
    canPreviousPage: boolean;
    canNextPage: boolean;
    nextPage: () => void;
    previousPage: () => void;
    state: { pageIndex: number; pageSize: number };
  } = tbl as any;

  return (
    <Box>
      <HStack align="center" justify="space-between">
        <IconButton
          aria-label="prev"
          icon={<BsArrowLeft />}
          onClick={pagination.previousPage}
        />
        <Text>
          {pagination.state.pageIndex + 1} / {pagination.pageCount}
        </Text>
        <IconButton
          aria-label="prev"
          icon={<BsArrowRight />}
          onClick={pagination.nextPage}
        />
      </HStack>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr
              {...headerGroup.getHeaderGroupProps()}
              key={headerGroup.getHeaderGroupProps().key}
            >
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps()}
                  key={column.getHeaderProps().key}
                >
                  {column.render("Header")}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {pagination.page.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={row.getRowProps().key}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()} key={cell.getCellProps().key}>
                    {cell.render("Cell")}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};
