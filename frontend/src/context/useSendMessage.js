import React, { useState } from 'react'
import useConversation from '../zusted/useConverstion';
import { useAuth } from './authContext';
import axios from 'axios';

const useSendMessage = () => {

  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();
  // console.log(messages)
  // console.log(selectedConversation)
  const { token } = useAuth();

    const sendMessages = async (message) => {
      // console.log("abhi ka type kiya gya ",message)
      setLoading(true);
    
        try {
          const res = await axios.post(
            `/api/message/messagesend/${selectedConversation._id}`,{message},
            {
              headers: {
                Authorization: token,
                webCredential: true,
              },
            }
          );
          console.log(res)
          setMessage([...messages,res.data]);
          setLoading(false);
        } catch (error) {
          console.log("Error in getting messages", error);
          setLoading(false);
        }
      }
      return {loading,sendMessages}
    };
 



export default useSendMessage
