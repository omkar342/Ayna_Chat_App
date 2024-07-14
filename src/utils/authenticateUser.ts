import { api } from "./axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const useCheckToken = () => {
  const navigate = useNavigate();

  const checkToken = (
    setUserAndToken: (userData: any, accessToken: string) => void
  ) => {
    let access_token = localStorage.getItem("accessToken");

    if (access_token) {
      loginWithAccessToken(access_token, setUserAndToken);
    } else {
      navigate("/");
      toast.error("Please login to continue");
    }
  };
  return checkToken;
};

export const loginWithAccessToken = async (
  accessToken: string,
  setUserAndToken: (userData: any, accessToken: string) => void
) => {
  try {
    const response = await api(
      "/user/login/token/access",
      "get",
      {},
      {
        "x-access-token": accessToken,
      }
    );

    setUserAndToken(response?.data?.userData, accessToken);
  } catch (error) {
    console.log(error);
  }
};
