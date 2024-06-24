import React,{ createContext, useContext, useEffect, useState } from "react";

import io from "socket.io-client";
import { useAuth } from "./authContext";
const socketContext = createContext();

// it is a hook.
export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const {usersData} = useAuth();
  // console.log(usersData)

  useEffect(() => {
    if (usersData) {
      const socket = io("http://localhost:8000", {
        query: {
          userId: usersData?._id,
        },
      });
      // console.log("socket mai kya hai",socket)
      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [usersData]);
  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};