import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UserProvider } from "../src/contexts/userContext.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../chakra-theme.ts";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Link, Route, Switch, Router } from "wouter";
import Hello from "./Hello.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <ChakraProvider theme={theme}>
        <Toaster position="top-center" reverseOrder={false} />
        <Router>
          {" "}
          {/* Router component added here to provide context */}
          {/* <App /> */}
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/hello" element={<Hello />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </UserProvider>
  </React.StrictMode>
);
