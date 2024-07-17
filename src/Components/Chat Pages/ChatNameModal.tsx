import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Button,
} from "@chakra-ui/react";

interface ChatNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  chatName: string;
  setChatName: (name: string) => void;
  handleSaveNewChat: () => void;
}

const ChatNameModal: React.FC<ChatNameModalProps> = ({
  isOpen,
  onClose,
  chatName,
  setChatName,
  handleSaveNewChat,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Create a new chat</ModalHeader>
        <ModalBody>
          <Input
            placeholder="Enter chat name"
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
          />
          <Button mt={4} colorScheme="blue" onClick={handleSaveNewChat}>
            Create
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ChatNameModal;
