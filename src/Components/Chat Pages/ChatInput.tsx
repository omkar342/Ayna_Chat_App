import React from "react";
import { FormControl, Input, Button, Stack } from "@chakra-ui/react";
import { MdSend } from "react-icons/md";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  message: string;
  setMessage: (name: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ message, setMessage, onSendMessage }) => {
  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <FormControl p={4} display="flex">
      <Stack direction={{ base: "column", md: "row" }} w="full" spacing={2}>
        <Input
          size="lg"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()} // Allow sending with the Enter key
        />
        <Button
          size="lg"
          leftIcon={<MdSend />}
          color="white"
          bg="brand.tertiary"
          onClick={handleSendMessage}
          w={{ base: "full", md: "auto" }}
        >
          Send
        </Button>
      </Stack>
    </FormControl>
  );
};

export default ChatInput;
