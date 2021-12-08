import { CNAEChart } from "../CNAEChart";
import { Box, CircularProgress, Container } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { CNAEClassifiers } from "../classifiers/cnae-classifiers";
import { Center, Text, VStack } from "@chakra-ui/layout";
import { SelectCNAEClassifier } from "../classifiers/SelectCNAEClassifier";

export function WrappedCNAEChartFun({
  children,
  isLoading,
  data = [],
}: {
  children?: any;
  isLoading?: boolean;
  data: { cnae: string; count: number }[];
}) {
  const [groupMethod, setGroupMethod] = useState(CNAEClassifiers[0]);
  const handleGroupMethodChange = (evt: ChangeEvent<HTMLSelectElement>) =>
    setGroupMethod(
      CNAEClassifiers.find((g) => g.name === evt.target.value) ||
        CNAEClassifiers[0]
    );

  return (
    <>
      <Box position="relative">
        {isLoading && (
          <CircularProgress
            position="absolute"
            right="50%"
            top="50%"
            isIndeterminate
          />
        )}
        <CNAEChart
          data={data || []}
          groupByFunction={(x) => groupMethod.classifier(x.cnae)}
          groupLabels={groupMethod.labels}
        />
      </Box>
      <Center maxW="100vw">
        <Container maxW="container.md">
          <VStack spacing="2">
            <Box w="full">
              <Text fontSize="xl" mb="2" fontWeight="medium">
                Agrupar
              </Text>
              <SelectCNAEClassifier
                onChange={handleGroupMethodChange}
                groupMethod={groupMethod}
              />
              {children}
            </Box>
          </VStack>
        </Container>
      </Center>
    </>
  );
}
