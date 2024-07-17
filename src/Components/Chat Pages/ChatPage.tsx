import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useUser, UserContextType } from "../../contexts/userContext";
import { useCheckToken } from "../../utils/authenticateUser";
import Sidebar from "./Sidebar";
import ChatNameModal from "./ChatNameModal";
import ChatInput from "./ChatInput";
import { api } from "../../utils/axiosInstance";
import { toast } from "react-hot-toast";
import { Chat } from "../../types/chat";
import { useWebSocket } from "../../contexts/webSocketContext";
import { Message } from "../../types/chat";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../Reusable Components/LogoutButton";

const ChatPage: React.FC = () => {
  const { sendMessage, joinRoom, onMessageReceived } = useWebSocket();

  const { userData, setUserAndToken } = useUser() as UserContextType;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [chatName, setChatName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInfo, setUserInfo] = useState<any>();
  const [latestMessage, setLatestMessage] = useState<{
    message?: string | undefined;
    senderType?: string | undefined;
  }>({});
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | undefined>(undefined);
  const [joinedRoom, setJoinedRoom] = useState("");

  const checkToken = useCheckToken();

  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      setTimeout(() => {
        checkToken(setUserAndToken);
      }, 1000);
    } else {
      setUserInfo(userData);
    }
  }, [userData, setUserAndToken]);

  // handleReceiveMessage to save the receive message in the database

  useEffect(() => {
    const handleReceiveMessage = async (newMessage: string) => {
      try {
        setLatestMessage({ message: newMessage, senderType: "socket" });

        if (!userData || !selectedChat || selectedChat._id !== joinedRoom) {
          return;
        }

        console.log("UserInfo", userInfo);

        await api("/chat/save-message", "post", {
          message: newMessage,
          sender: userData?._id,
          associatedChat: selectedChat?._id,
          senderType: "socket",
        });

        // if (response.status === 200) {
        //   // setSelectedChat(response.data.chat);
        //   setMessages(response.data.chat.messages);
        //   console.log("Response 55", response);
        // } else {
        //   console.log("Message not saved");
        // }
      } catch (e) {
        console.log("Error in receiving message 65", e);
      }
    };

    onMessageReceived(handleReceiveMessage);
    // return () => {
    //   console.log("Cleaning up");
    //   cleanup;
    // };
  }, [userData, selectedChat, onMessageReceived]);

  // handleChatSelect to select the chat and join the room

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
    setMessages(chat.messages);
    joinRoom(chat._id);
    setJoinedRoom(chat._id);
    setLatestMessage({});
  };

  // handleSaveNewChat to save the new chat in the database

  const handleSaveNewChat = useCallback(async () => {
    try {
      const response = await api("/chat/save-new-chat", "post", {
        chatCreator: userData?._id,
        chatName,
      });

      if (response.status === 201) {
        toast.success("Chat saved successfully");
        setChats((prevChats) => [...prevChats, response.data.chat]);
        setSelectedChat(response.data.chat);
        setMessages(response.data.chat.messages);
        setJoinedRoom(response.data.chat._id);
        joinRoom(response.data.chat._id);
        setLatestMessage({});
        setChatName("");
        onClose();
      }
    } catch (e) {
      console.log(e);
      onClose();
      toast.error("Failed to save chat");
    }
  }, [userData?._id, chatName, onClose]);

  // handleSendMessage to send the message to the selected chat

  const handleSendMessage = async () => {
    try {
      const response = await api("/chat/save-message", "post", {
        message,
        sender: userData?._id,
        associatedChat: selectedChat?._id,
        senderType: "user",
      });

      if (response.status === 200) {
        setMessages(response.data.chat.messages);
        sendMessage(selectedChat?._id as string, message);
        toast.success("Message sent successfully");
      } else {
        console.log("Message not saved 143");
      }
      setMessage("");
    } catch (e) {
      console.log(e);
      toast.error("Failed to send message");
    }
  };

  // getSavedChatsAndMessages to get the saved chats and messages

  useEffect(() => {
    const getSavedChatsAndMessages = async () => {
      try {
        const response = await api("/chat/get-saved-chats", "post", {
          chatCreator: userData?._id,
        });
        if (response.status === 200) {
          setChats(response.data.chatData);
          setSelectedChat(response.data.chatData[1]);
          setMessages(response.data.chatData[1].messages);
          setJoinedRoom(response.data.chatData[1]._id);
          joinRoom(response.data.chatData[1]._id);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching chats", error);
        toast.error("Failed to fetch chats");
      }
    };
    userData && userData._id && !joinedRoom && getSavedChatsAndMessages();
  }, [userData]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUserAndToken(null, "");
    navigate("/");
  }

  return (
    <Box display="flex" h="100vh">
      <Sidebar
        onOpen={onOpen}
        chats={chats}
        selectedChat={selectedChat}
        handleChatSelect={handleChatSelect}
      />
      <LogoutButton handleLogout={handleLogout}/>
      <Box flex="1" p={4} display="flex" flexDirection="column">
        <Box flex="1" p={4} overflowY="auto">
          <Text align="center">
            <Heading size="2xl" color="brand.tertiary">
              Send Message To Yourself!
            </Heading>
          </Text>
        </Box>
        <Box flex="3" p={4} overflowY="auto">
          <VStack spacing={4} align="stretch">
            {messages?.map((msg, index) => (
              <Box
                key={index}
                bg={msg.senderType === "user" ? "blue.500" : "gray.200"}
                color={msg.senderType === "user" ? "white" : "black"}
                p={2}
                borderRadius="lg"
                alignSelf={
                  msg.senderType === "user" ? "flex-end" : "flex-start"
                }
              >
                {msg.message}
              </Box>
            ))}
          </VStack>
          <VStack spacing={4} align="stretch">
            {latestMessage && (
              <Box
                // key={index}
                bg={"gray.200"}
                color={"black"}
                p={2}
                borderRadius="lg"
                alignSelf={"flex-start"}
              >
                {latestMessage.message}
              </Box>
            )}
          </VStack>
        </Box>
        <ChatInput
          message={message}
          setMessage={setMessage}
          onSendMessage={handleSendMessage}
        />
      </Box>
      <ChatNameModal
        isOpen={isOpen}
        onClose={onClose}
        chatName={chatName}
        setChatName={setChatName}
        handleSaveNewChat={handleSaveNewChat}
      />
    </Box>
  );
};

export default ChatPage;
