import { Box, IconButton, Tooltip } from "@chakra-ui/react";
import { useBackendAuthManager } from "@auth/backend/use-backend-auth-manager";
import { HStack, Text } from "@chakra-ui/layout";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";

export const BackendAuthButton = () => {
  const { isAuthenticated, profile, loginHandlers, handleLogout } =
    useBackendAuthManager();

  if (isAuthenticated && profile) {
    return (
      <HStack spacing="0" bg="gray.200" rounded="md" overflow="hidden">
        <Box px="4">
          <Tooltip label={`${profile.name} - ${profile.email}`}>
            <Text fontWeight="bold">{profile.givenName}</Text>
          </Tooltip>
        </Box>
        <IconButton
          rounded="0"
          onClick={handleLogout}
          py="2"
          variant="ghost"
          aria-label="logout"
          icon={<IoMdLogOut />}
        />
      </HStack>
    );
  }

  return (
    <IconButton
      rounded="md"
      onClick={loginHandlers.google}
      py="2"
      variant="ghost"
      aria-label="logout"
      icon={<IoMdLogIn />}
    />
  );
};
