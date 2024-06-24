import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

import Cookies from "js-cookie";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [usersData, setUsersData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const initialState = Cookies.get("jwt") && localStorage.getItem("token");

  useEffect(() => {
    if (initialState) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);

  const token = Cookies.get("jwt");

  useEffect(() => {
    const getProfile = async () => {
      if (token) {
        setLoader(true);
        await axios
          .get("api/user/profile", {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            setLoader(false);
            setUsersData(response.data.user);
          })
          .catch((error) => {
            console.log(error);
            setLoader(false);
            setUsersData(null);
          });
      }
    };
    getProfile();
  }, [token]);

  const logout = () => {
    Cookies.remove("jwt");
    setIsLogged(false);
    setUsersData(null);
  };
console.log(usersData)
  return (
    <AuthContext.Provider
      value={{ isLogged, setIsLogged, usersData, loader, setLoader, logout,token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
