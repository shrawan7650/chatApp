import React, { useEffect, useRef } from "react";
import MessagesUser from "./MessagesUser.jsx";
import useGetMessage from "../../../context/useGetMessage.js";
import Loading from "../../../controller/loading/Loading.jsx";
import useGetSocketMessage from "../../../context/useGetSocketMessage.js";

const Message = () => {
  const { loading, messages } = useGetMessage();

  useGetSocketMessage();
  console.log("yah message hai", messages);

  const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [messages]);
  return (
    <div className=" relative  min-h-[84vh]">
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMsgRef}>
            <MessagesUser message={message} />
          </div>
        ))
      )}
      {!loading && messages.length === 0 && (
        <div className="flex items-center justify-center  absolute top-56 md:left-96 left-16">
          <p className="text-gray-300 text-2xl">
            say! hi to start the convertion
          </p>
        </div>
      )}
    </div>
  );
};

export default Message;
