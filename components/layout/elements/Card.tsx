import { Box, BoxProps } from "@chakra-ui/layout";

export const Card = (props: BoxProps) => (
  <Box p="4" shadow="md" rounded="md" {...props} />
);
