import React, { useState, useEffect, useContext, createContext } from "react";
import jwtDecode from "jwt-decode";
import http from "./httpService";
import { tokenKey } from "../config.json";

const apiEndpoint = "/auth";
const authContext = createContext();

// Provider component that wraps the app and makes auth object ...
// ... available to any child component that callse useAuth();
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}> {children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  // Methods for auth
  const login = async (username, password) => {
    const { data: jwt } = await http.post(apiEndpoint, { username, password });

    if (jwt) {
      setUser(jwt);
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    return null;
  };

  const register = () => {
    return null;
  };

  const getCurrentUser = () => {
    return null;
  };

  const getJwt = () => {
    return null;
  };

  http.setJwt(getJwt());

  const passwordReset = () => {
    return null;
  };

  const passwordChange = () => {
    return null;
  };

  useEffect(() => {
    const unsubscribe = user => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    };

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return {
    user,
    login,
    logout,
    register,
    getCurrentUser,
    getJwt,
    passwordReset,
    passwordChange
  };
}
