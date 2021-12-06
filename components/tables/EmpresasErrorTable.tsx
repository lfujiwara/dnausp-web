import { FC, useMemo, useState } from "react";
import { DefaultWorksheet } from "@sheets/defaults/default-worksheet";
import { Row, usePagination, useSortBy, useTable } from "react-table";
import {
  Box,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { HStack, Text } from "@chakra-ui/layout";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useDisclosure } from "@chakra-ui/hooks";
import { Button } from "@chakra-ui/button";

const RowModal = ({
  children,
  isOpen,
  onClose,
}: {
  children: any;
  isOpen: boolean;
  onClose: () => any;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="container.xl">
        <ModalHeader>Dados da empresa (de acordo com a planilha)</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box overflowX="auto">{children}</Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const EmpresasErrorTable: FC<{
  results: {
    input: DefaultWorksheet;
    output: string[];
  }[];
}> = ({ results }) => {
  const modal = useDisclosure();
  const [modalChildren, setModalChildren] = useState<any>();
  const open = (children: any) => () => {
    setModalChildren(children);
    modal.onOpen();
  };

  const data = useMemo(
    () =>
      results.map((r) => ({
        index: r.input["Índice"],
        erros: r.output.join(", "),
        input: JSON.stringify(r.input, null, 2),
      })),
    [results]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Índice",
        accessor: "index",
        width: 100,
      },
      {
        Header: "Erros",
        accessor: "erros",
        width: 300,
      },
      {
        Header: "Input",
        accessor: "input",
        width: 300,
        Cell: ({ value }: { value: any }) => (
          <Button onClick={open(<pre>{value}</pre>)}>Ver dados</Button>
        ),
      },
    ],
    []
  ) as any;

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
      <RowModal {...modal}>{modalChildren}</RowModal>
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
