import { FC, useMemo, useState } from "react";
import { Empresa } from "@dnausp/core";
import {
  Cell,
  Column,
  Row,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
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
  ModalProps,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { HStack, Text } from "@chakra-ui/layout";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { MapEmpresaValue } from "../../lib/app/map-empresa";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { useSendEmpresaToBackend } from "../../hooks/useSendEmpresaToBackend";
import { FaturamentosChart } from "../charts/FaturamentosChart";

const FaturamentosModal = ({
  empresa,
  modalProps,
}: {
  empresa?: Empresa;
  modalProps: Omit<ModalProps, "children">;
}) => {
  const fmt = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const name = empresa?.razaoSocial || empresa?.nomeFantasia;
  const faturamentos = [...(empresa?.historicoFaturamentos.valores || [])].sort(
    (a, b) => (a.anoFiscal > b.anoFiscal ? 1 : -1)
  );

  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Faturamento de {name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FaturamentosChart faturamentos={faturamentos} />
          <HStack justify="space-around" spacing="2">
            {faturamentos.map((f) => (
              <VStack key={f.anoFiscal} flex="1">
                <Text textAlign="right">{f.anoFiscal}</Text>
                <Text textAlign="right">{fmt.format(f.valor / 100)}</Text>
              </VStack>
            ))}
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={modalProps.onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const EmpresasTable: FC<{ empresas: MapEmpresaValue[] }> = ({
  empresas = [],
}) => {
  const [empresaToDisplay, setEmpresaToDisplay] = useState<Empresa | undefined>(
    undefined
  );
  const faturamentosModal = useDisclosure();
  const mutation = useSendEmpresaToBackend();

  const openFaturamento = (empresa: Empresa) => () => {
    setEmpresaToDisplay(empresa);
    faturamentosModal.onOpen();
  };

  const data = useMemo(
    () =>
      empresas.map(({ output: empresa }) => ({
        cnpj: empresa.estrangeira
          ? `Exterior ${empresa.idEstrangeira}`.trim()
          : empresa.cnpj.format(),
        nomeFantasia: empresa.nomeFantasia,
        razaoSocial: empresa.razaoSocial,
        faturamentos: {
          empresa,
          results: empresa.historicoFaturamentos.valores,
        },
        send: empresa,
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
        {
          Header: "Faturamentos",
          accessor: "faturamentos",
          Cell: ({
            cell,
          }: {
            cell: Cell<{
              empresa: Empresa;
              results: any;
            }>;
          }) => (
            <Button onClick={openFaturamento(cell.value.empresa)}>
              Ver faturamentos
            </Button>
          ),
        },
        {
          Header: "Ações",
          accessor: "send",
          Cell: ({ cell }: { cell: Cell<Empresa> }) => {
            const [isLoading, setIsLoading] = useState(false);
            return (
              <Button
                onClick={() => {
                  setIsLoading(true);
                  mutation.mutate(cell.value, {
                    onSuccess: () => setIsLoading(false),
                    onError: () => setIsLoading(false),
                  });
                }}
                isLoading={isLoading}
              >
                Enviar dados
              </Button>
            );
          },
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
      <FaturamentosModal
        empresa={empresaToDisplay}
        modalProps={faturamentosModal}
      />
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
