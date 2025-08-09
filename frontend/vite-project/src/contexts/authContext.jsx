import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import httpStatus from "http-status";
import server from "../environment";
export const AuthContext = createContext({});

export const client = axios.create({
  baseURL: `${server}/api/v1/users`,
});
export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (name, username, password) => {
    let request = await client.post("/register", {
      name,
      username,
      password,
    });

    if (request.status === httpStatus.CREATED) {
      return request.data.message;
    }
  };

  const handleLogin = async (username, password) => {
    let request = await client.post("/login", { username, password });

    if (request.status === httpStatus.OK) {
      localStorage.setItem("token", request.data.token);
      navigate("/home");
    }
  };

  const getHistoryOfUser = async () => {
    let request = await client.get("/get_all_activity", {
      params: { token: localStorage.getItem("token") },
    });
    return request.data;
  };

  const addToUserHistory = async (meetingCode) => {
    
      let request = await client.post("/add_to_activity", {
        token: localStorage.getItem("token"),
        meeting_code: meetingCode,
      });
      return request.data;
  };

  const value = {
    userData,
    setUserData,
    handleRegister,
    handleLogin,
    getHistoryOfUser,
    addToUserHistory,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
