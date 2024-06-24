/* eslint-disable react/prop-types */
import React from 'react';
import useGetSocketMessage from '../../../context/useGetSocketMessage';

const MessagesUser = ({ message }) => {
  useGetSocketMessage();
  const authUserData = JSON.parse(localStorage.getItem('token'));
  const itsMe = message.senderId === authUserData?.user?._id;
  const chatName = itsMe ? 'chat-end' : 'chat-start';
  const chatColor = itsMe ? 'bg-blue-500' : 'bg-green-500';

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  
  const firstName = authUserData.user.name.charAt(0);

  return (
    <div className="p-4">
      <div className={`chat ${chatName}`}>
     
        <div className={`chat-bubble text-white ${chatColor}`}>
          {message.message}
        </div>
        <div className="chat-footer">{formattedTime}</div>
      </div>
    </div>
  );
};

export default MessagesUser;
