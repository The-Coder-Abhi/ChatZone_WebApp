import React, { useState } from 'react'
import User from "../../img/User.png"
import "./ChatRecyclerView.css"

const ChatRecyclerView = ({ name, img, status, onClick }) => {
    
  return (
    <div className="chatRecyclerView_Wrapper" onClick={onClick} style={{cursor: 'pointer'}}>
        <div className="chatRecyclerView_Container">
            <div className="user-profileImg">
                <img src={img?img:User} alt="profileImage" />
            </div>
            <div className="user-infoText">
            <h3>{name}</h3>
            <h5>{status}</h5>
            </div>
        </div>
    </div>
  )
}

export default ChatRecyclerView
