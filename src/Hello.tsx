import React, { useEffect } from 'react'
import { useUser, UserContextType } from '../src/contexts/userContext'; 
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";

function Hello() {

    const { userData } = useUser() as UserContextType;

    const navigate = useNavigate();

    useEffect(() => {
        if (!userData) {
            console.log("User not logged in");
            toast.error("Please login to access this page");
            setTimeout(() => {
              navigate("/");
            }, 1000);
        }
    },[])

    console.log("Hello component is rendering");
  return (
    <div>Hello</div>
  )
}

export default Hello