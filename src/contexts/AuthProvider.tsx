import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "./constant";
import setAuthToken from "../utils/setAuthToken";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface AuthContextIProps {
  login: (name: string, password: string) => any;
  register: (name: string, password: string) => any;
  logout: () => any;
  currentUser: any;
}
interface AuthProviderIProps {
  children: React.ReactNode;
}
const AuthContext = createContext({} as AuthContextIProps);

export function useAuthContext() {
  return useContext(AuthContext);
}
const AuthProvider: React.FC<AuthProviderIProps> = ({ children }) => {
  const [token, setToken] = useLocalStorage("jwt", null);
  const [currentUser, setCurrentUser] = useLocalStorage("user", null);

  const loadUser = async () => {
    if (localStorage["jwt"]) {
      setAuthToken(JSON.parse(localStorage["jwt"]));
    }
    try {
      const { data } = await axios.get(`${API_URL}/auth`);
      console.log(data);
      if (data.success) {
        setCurrentUser(data.user);
      }
    } catch (err) {
      console.log(err);
      localStorage.removeItem("jwt");
      setCurrentUser(null);
    }
  };

  const login = async (name: string, password: string) => {
    const { data } = await axios.post(`${API_URL}/auth/login`, { name, password });
    if (data.success) {
      localStorage.setItem("jwt", JSON.stringify(data.accessToken));
    }
    await loadUser();
    return data;
  };

  const register = async (name: string, password: string) => {
    const { data } = await axios.post(`${API_URL}/auth/register`, { name, password });
    if (data.success) {
      localStorage.setItem("jwt", JSON.stringify(data.accessToken));
    }
    await loadUser();
    return data;
  };

  const logout = async () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
  };

  const value = { login, register, logout, currentUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
