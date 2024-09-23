/* eslint-disable react/prop-types */
import React from "react";
import useConversation from '../../../zusted/useConverstion.js'
import { useSocketContext } from "../../../context/socketContext.jsx";


const User = ({ user , showMd ,setShowMd}) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
const { socket, onlineUsers } = useSocketContext();
const isOnline = onlineUsers.includes(user._id)
const userFirstname = user?.name.charAt(0).toUpperCase();
// console.log(userFirstname)
console.log(showMd)
 const hnadleSeletedUser = ()=>{

  setSelectedConversation(user);
  setShowMd(false)
 

 }

  return (
    <>
      {(
      <div  onClick={hnadleSeletedUser}  className={`hover:bg-slate-600 duration-30 ${isSelected?" bg-slate-700":""}`}>
          <div className="flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer">
          <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 h-12 rounded-full border relative">
            <div className="absolute inset-0 text-2xl font-semibold  font-serif flex items-center justify-center">
              {userFirstname}
            </div>
          </div>
        </div>
            <div>
              <h1 className="font-bold">{user.name}</h1>
              <span>{user.email}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
