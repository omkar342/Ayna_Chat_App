import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UserProvider } from "../src/contexts/userContext.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../chakra-theme.ts";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hello from "./Components/Chat Pages/Hello.tsx";
import ChatPage from "./Components/Chat Pages/ChatPage.tsx";
import { WebSocketProvider } from "../src/contexts/webSocketContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WebSocketProvider>
      <UserProvider>
        <ChakraProvider theme={theme}>
          <Toaster position="top-center" reverseOrder={false} />
          <Router>
            {" "}
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/hello" element={<Hello />} />
              <Route path="/chat" element={<ChatPage />} />
            </Routes>
          </Router>
        </ChakraProvider>
      </UserProvider>
    </WebSocketProvider>
  </React.StrictMode>
);
