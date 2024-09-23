import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../../context/useSendMessage";
import InputEmoji from "react-input-emoji";

const TypeSend = () => {
  const { loading, sendMessages } = useSendMessage();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      await sendMessages(message);
      setMessage("");
    }
  };

  const handleEmojiChange = (newMessage) => {
    setMessage(newMessage);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center h-[8vh] bg-gray-800 space-x-1">
      <div className="md:w-[60%]  w-[80%] mx-4">
        <InputEmoji
          value={message}
          onChange={handleEmojiChange}
          cleanOnEnter
          placeholder="Type a message"
          borderColor="rgba(107, 114, 128, 1)" // Tailwind gray-700
        />
      </div>
      <button type="submit"  className="text-3xl">
        <IoSend />
      </button>
    </form>
  );
};

export default TypeSend;
