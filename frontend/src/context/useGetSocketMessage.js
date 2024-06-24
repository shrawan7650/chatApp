import React, { useEffect } from "react";
import { useSocketContext } from "./socketContext";
import useConversation from "../zusted/useConverstion";
import sound from "../assets/mewe.mp3";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessage } = useConversation();

  useEffect(() => {
    if (!socket) {
      console.error("Socket is null or undefined.");
      return;
    }

    const handleNewMessage = (newMessage) => {
      const notification = new Audio(sound);
      notification.play();
      setMessage([...messages, newMessage]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, messages, setMessage]);
};

export default useGetSocketMessage;
