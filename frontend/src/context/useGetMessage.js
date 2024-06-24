import React, { useEffect, useState } from "react";
// import useConversation from "../zustand/useConversation.js";
import axios from "axios";
import useConversation from "../zusted/useConverstion";
import { useAuth } from "./authContext";
const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();
  console.log(messages)
  const { token } = useAuth();
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      if (selectedConversation && selectedConversation._id) {
        try {
          const res = await axios.get(
            `/api/message/getmessage/${selectedConversation._id}`,
            {
              headers: {
                Authorization: token,
                webCredential: true,
              },
            }
          );
          console.log(res)
          setMessage(res.data);
          setLoading(false);
        } catch (error) {
          console.log("Error in getting messages", error);
          setLoading(false);
        }
      }
    };
    getMessages();
  }, [selectedConversation, setMessage]);
  return { loading, messages };
};

export default useGetMessage;
