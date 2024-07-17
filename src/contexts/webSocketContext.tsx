import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { baseURL } from "../utils/urls";
// import { Message } from '../types/chat';

interface WebSocketContextType {
  socket: Socket | null;
  joinRoom: (roomId: string) => void;
  sendMessage: (roomId: string, message: string) => void;
  onMessageReceived: (callback: (message: string) => void) => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const useWebSocket = () => useContext(WebSocketContext) as WebSocketContextType;

interface WebSocketProviderProps {
  children: ReactNode; // This defines the type for children
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(baseURL, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
    });
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const joinRoom = (roomId: string) => {
    socket?.emit("joinRoom", roomId);
  };

  const sendMessage = (roomId: string, message: string) => {
    socket?.emit("sendMessage", { roomId, message });
  };

  const onMessageReceived = (callback: (message: string) => void) => {
    socket?.on('receiveMessage', (message) => {
      console.log('Message received');
      callback(message);
    });
  
    return () => socket?.off('receiveMessage');
  };
  

  return (
    <WebSocketContext.Provider value={{ socket, joinRoom, sendMessage, onMessageReceived }}>
      {children}
    </WebSocketContext.Provider>
  );
};

