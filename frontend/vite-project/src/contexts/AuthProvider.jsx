// src/contexts/AuthProvider.jsx
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, client } from "./authContext";
import httpStatus from "http-status";

export const AuthProvider = ({ children }) => {
  const authContext = useContext(AuthContext);
  const [userData, setUserData] = useState(authContext);
  const router = useNavigate();

  const handleRegister = async (name, username, password) => {
    const request = await client.post("/register", {
      name,
      username,
      password,
    });

    if (request.status === httpStatus.CREATED) {
      return request.data.message;
    }
  };

  const handleLogin = async (username, password) => {
    const request = await client.post("/login", {
      username,
      password
    });
        console.log(request.data) ;   
    if (request.status === httpStatus.OK) {
      localStorage.setItem("token", request.data.token);
      router("/home");
    }
  };

  const data = {
    userData,
    setUserData,
    handleRegister,
    handleLogin,
  };

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  );
};
