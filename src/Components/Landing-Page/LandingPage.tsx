import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
import Register from "./Register";
import Login from "./Login";
import WelcomeText from "../Reusable Components/WelcomeText";

function LandingPage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      // bg="brand.primary"
      p={4}
    >
      <WelcomeText />
      <Box
        maxW="2xl"
        w="full"
        // bg="brand.primary"
        shadow="md"
        rounded="md"
        p={8}
        mb={4}
        border="1px"
        borderColor="brand.tertiary"
      >
        <Tabs isFitted variant="enclosed" colorScheme="pink">
          <TabList mb="1em">
            <Tab style={{ fontWeight: "bold" }}>Existing User? Login</Tab>
            <Tab style={{ fontWeight: "bold" }}>
              Don't have an Account? Register
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Register />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}

export default LandingPage;
