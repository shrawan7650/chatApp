import React, { useEffect } from "react";
import { IoMdMenu } from "react-icons/io";
import ChatUser from './components/ChatUser';
import Message from "./components/Message";
import TypeSend from "./components/TypeSend";
import useConversation from "../../zusted/useConverstion";
import { useAuth } from "../../context/authContext";

// eslint-disable-next-line react/prop-types
const RightPart = ({ setShowMd, showMd }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="w-[100%] bg-slate-900 text-gray-300 relative">
      {/* Background overlay */}
      {/* <div
        className={`fixed inset-0 z-10 bg-black bg-opacity-50 transition-opacity duration-300 ${showMd ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setShowMd(false)}
      ></div> */}

      {/* Menu icon */}
      <IoMdMenu
        className={`text-3xl md:hidden absolute top-4 ${showMd ? 'right-4' : 'left-4'} z-20 transition-all duration-300`}
        onClick={() => setShowMd(!showMd)}
      />

      {/* Main content */}
      <div className={`${showMd ? 'blur-sm' : 'blur-none'} transition-all duration-300 relative z-10`}>
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <ChatUser />
            <div
              className="flex-1 overflow-y-auto"
              style={{ maxHeight: "calc(92vh - 8vh)" }}
            >
              <Message />
            </div>
            <TypeSend />
          </>
        )}
      </div>
    </div>
  );
};

export default RightPart;

const NoChatSelected = () => {
  const { usersData } = useAuth();
  return (
    <div className="relative z-20 flex h-screen items-center justify-center">
      <h1 className="text-center">
        Welcome{" "}
        <span className="font-semibold text-xl">
          {usersData?.name}
        </span>
        <br />
        No chat selected, please start conversation by selecting anyone to
        your contacts
      </h1>
    </div>
  );
};
