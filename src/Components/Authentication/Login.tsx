import React, { useState } from "react";
import {
  FormControl,
  Input,
  Button,
  VStack,
  Heading,
  Box,
} from "@chakra-ui/react";
import { toast } from "react-hot-toast";
import { api } from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useUser, UserContextType } from "../../contexts/userContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUserAndToken } = useUser() as UserContextType;

  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (!email || !password) {
        toast.error("Please enter both email and password.");
        return;
      }
      const response = await api("/user/login", "post", {
        userEmail: email,
        password,
      });

      if (response.status === 200) {
        // localStorage.setItem("accessToken", response.data.access_token);
        // localStorage.setItem("refreshToken", response.data.refresh_token);
        toast.success("Logged in Successfully!");
      
        setUserAndToken(response.data.userData, response.data.accessToken); // Set user data and token
        
        setEmail("");
        setPassword("");

        navigate("/hello");
      }
    } catch (error) {
      console.error("Login Error", error);
      toast.error("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <Box p={4}>
      <Heading as="h2" size="xl" mb={6} color="brand.tertiary">
        Login
      </Heading>
      <VStack spacing={4} as="form" onSubmit={handleLogin}>
        <FormControl>
          <Input
            size="lg"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Input
            size="lg"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button
          type="submit"
          colorScheme="pink"
          size="lg"
          width="full"
          onClick={handleLogin}
        >
          Login
        </Button>
      </VStack>
    </Box>
  );
}

export default Login;
