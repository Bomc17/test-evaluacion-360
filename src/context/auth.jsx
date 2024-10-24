import React, { useContext, createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getAccessToken = () => accessToken;

  const saveUser = (userData) => {
    setAccessTokenAndSaveToken(userData.token);
    const decodedUser = jwtDecode(userData.token);
    setUser(decodedUser);
    setIsAuthenticated(true);
  };

  const setAccessTokenAndSaveToken = (token) => {
    setAccessToken(token);
    localStorage.setItem("accessToken", token);
  };

  const getUser = () => user;

  const signout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken("");
    setUser(null);
    setIsAuthenticated(false);
  };

  const checkAuth = async () => {
    try {
      const storedAccessToken = localStorage.getItem("accessToken");
      if (storedAccessToken) {
        const decodedUser = jwtDecode(storedAccessToken);
        setUser(decodedUser);
        setAccessToken(storedAccessToken);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        getAccessToken,
        saveUser,
        getUser,
        signout,
      }}
    >
      {isLoading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
