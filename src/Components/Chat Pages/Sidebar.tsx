import React from "react";
import {
  Box,
  Button,
  VStack,
  List,
  ListItem,
  Flex,
  Text,
  Heading,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { MdMessage, MdMenu } from "react-icons/md";
import { Chat } from "../../types/chat";

interface SidebarProps {
  onOpen: () => void;
  chats: Chat[];
  selectedChat: Chat | undefined;
  handleChatSelect: (chat: Chat) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onOpen, chats, selectedChat, handleChatSelect }) => {
  const { isOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();

  return (
    <>
      <Box display={{ base: "none", md: "block" }} w={{ md: "25%", lg: "20%" }} bg="brand.quaternary" py={4} color="white">
        <VStack spacing={4} align="stretch" px={2}>
          <Button
            leftIcon={<MdMessage />}
            bg="brand.tertiary"
            color="white"
            onClick={onOpen}
            my={4}
          >
            New Chat
          </Button>
          <Heading color="#000">All Chats</Heading>
          <List spacing={0}>
            {chats.map((chat) => (
              <ListItem
                key={chat._id}
                p={2}
                borderRadius="md"
                bg={selectedChat && selectedChat._id === chat._id ? "brand.tertiary" : "brand.primary"}
                cursor="pointer"
                onClick={() => handleChatSelect(chat)}
                _hover={{ bg: "#9E2D6D" }}
              >
                <Flex align="center">
                  <Box>
                    <Text fontWeight={selectedChat && selectedChat._id === chat._id ? "bold" : "normal"}>
                      {chat.chatName}
                    </Text>
                  </Box>
                </Flex>
              </ListItem>
            ))}
          </List>
        </VStack>
      </Box>

      <IconButton
        aria-label="Open menu"
        icon={<MdMenu />}
        display={{ base: "block", md: "none" }}
        // style={{ margin: "auto" }}
        onClick={onDrawerOpen}
      />

      <Drawer isOpen={isOpen} placement="left" onClose={onDrawerClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create or Select a Chat</DrawerHeader>
            <DrawerBody>
              <VStack spacing={4} align="stretch" px={2}>
                <Button
                  leftIcon={<MdMessage />}
                  bg="brand.tertiary"
                  color="white"
                  onClick={onOpen}
                  my={4}
                >
                  New Chat
                </Button>
                <Heading color="#000">All Chats</Heading>
                <List spacing={0}>
                  {chats.map((chat) => (
                    <ListItem
                      key={chat._id}
                      p={2}
                      borderRadius="md"
                      bg={selectedChat && selectedChat._id === chat._id ? "brand.tertiary" : "brand.primary"}
                      cursor="pointer"
                      onClick={() => {
                        handleChatSelect(chat);
                        onDrawerClose(); 
                      }}
                      _hover={{ bg: "#9E2D6D" }}
                    >
                      <Flex align="center">
                        <Box>
                          <Text fontWeight={selectedChat && selectedChat._id === chat._id ? "bold" : "normal"}>
                            {chat.chatName}
                          </Text>
                        </Box>
                      </Flex>
                    </ListItem>
                  ))}
                </List>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default Sidebar;
