import { Button } from "@chakra-ui/button";
import { FaGoogle } from "react-icons/fa";
import Icon from "@chakra-ui/icon";

export const GoogleLoginOrLogout = ({
  isSignedIn,
  isLoading,
  onSignIn,
  onSignOut,
}: {
  isSignedIn: boolean;
  isLoading: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
}) => {
  if (isSignedIn) {
    return (
      <Button onClick={onSignOut} isLoading={isLoading} colorScheme="blue">
        Sair de <Icon as={FaGoogle} ml="4" />
      </Button>
    );
  }

  return (
    <Button isLoading={isLoading} onClick={onSignIn}>
      Entrar com <Icon as={FaGoogle} ml="4" />
    </Button>
  );
};
