import React, { createContext, useContext, useState } from 'react';

// Create the context
const UserContext = createContext({});

// Custom hook to use the context
export const useUser = () => useContext(UserContext);

export interface UserContextType {
  userData: any; // You can replace 'any' with a more specific type or interface for user data
  token: string;
  setUserData: (userData: any) => void;  // Replace 'any' with a specific type for userData
  setToken: (token: string) => void;
  setUserAndToken: (userData: any, token: string) => void;  // Replace 'any' with a specific type for userData
}

// Provider component
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [token, setToken] = useState<string>('');

  interface UserData {
    email: string;
    password: string;
    _id: string;
  }

  const setUserAndToken = (data: UserData, accessToken: string): void => {
    setUserData(data);
    setToken(accessToken);
    localStorage.setItem('accessToken', accessToken); // Save token to local storage
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, token, setToken, setUserAndToken }}>
      {children}
    </UserContext.Provider>
  );
};