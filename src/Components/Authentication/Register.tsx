import {
  FormControl,
  Input,
  Button,
  VStack,
  Heading,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { api } from "../../utils/axiosInstance";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useUser, UserContextType } from "../../contexts/userContext";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setUserAndToken } = useUser() as UserContextType;

  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (!email || !password || !confirmPassword) {
        toast.error("Please fill all the fields");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      const response = await api("/user/register", "post", {
        userEmail: email,
        password: password,
        confirmPassword: confirmPassword,
      });
      if (response.status === 201) {

        toast.success("Registered Successfully");
        setUserAndToken(response.data.userData, response.data.accessToken);
        
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        navigate('/hello-world');
      }
    } catch (e) {
      console.log("Error", e);
      toast.error("Error in Registering");
    }
  };

  return (
    <Box p={4}>
      <Heading as="h2" size="xl" mb={6} color="brand.tertiary">
        Register
      </Heading>
      <VStack spacing={4} as="form">
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
        <FormControl>
          <Input
            size="lg"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>
        <Button
          type="submit"
          colorScheme="pink"
          size="lg"
          width="full"
          onClick={handleRegister}
        >
          Register
        </Button>
      </VStack>
    </Box>
  );
}

export default Register;