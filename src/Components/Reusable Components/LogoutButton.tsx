import { Button, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { IoLogOutOutline } from "react-icons/io5";

function LogoutButton({ handleLogout }: { handleLogout: () => void }) {
  const logoutButton = useBreakpointValue({
    base: (
      <IconButton
        aria-label="Logout"
        icon={<IoLogOutOutline />}
        onClick={handleLogout}
        colorScheme="red"
        position="absolute"
        top="4px"
        right="4px"
      />
    ),
    md: (
      <Button
        position="absolute"
        top="4px"
        right="4px"
        onClick={handleLogout}
        colorScheme="red"
      >
        Logout
      </Button>
    ),
  });
  return <>{logoutButton}</>;
}

export default LogoutButton;
