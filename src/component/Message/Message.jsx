import React from "react";
import './Message.css'

const Message = ({ senderId, currentUser, msg }) => {
  return (
    <div className={`message-container ${senderId === currentUser ? 'sender' : 'receiver'}`} >
      <p>{msg.message}</p>
      <span>{msg.currenttime}</span>
    </div>
  );
};

export default Message;
