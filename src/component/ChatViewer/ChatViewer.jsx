import React, { useEffect, useState } from "react";
import { ref, onValue, push, update } from "firebase/database";
import { auth, db } from "../../services/firebase";
import "./ChatViewer.css";
import Message from "../Message/Message";
import { FaArrowLeft } from 'react-icons/fa';

const ChatViewer = ({ selectedUser, setSelectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const currentHour = new Date().getHours();

  const isFrozen = currentHour >= 0 && currentHour < 13;

  useEffect(() => {
    if (!selectedUser || !auth.currentUser) return;

    const myUid = auth.currentUser.uid;
    const theirUid = selectedUser.id;

    // Listen to the sender's specific room (matches Android behavior)
    const senderRoom = myUid + theirUid;
    const messagesRef = ref(db, `chats/${senderRoom}/messages`);

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const msgs = [];
      snapshot.forEach((child) => {
        msgs.push({ id: child.key, ...child.val() });
      });
      setMessages(msgs);
    });
    
    return () => unsubscribe();
  }, [selectedUser]);

  const sendMessage = async () => {
    if (newMessage.trim() === "" || !auth.currentUser) return;

    const myUid = auth.currentUser.uid;
    const theirUid = selectedUser.id;
    
    // Define both rooms
    const senderRoom = myUid + theirUid;
    const receiverRoom = theirUid + myUid;

    // 1. Generate a new unique key for the message
    const newMessageKey = push(ref(db, `chats/${senderRoom}/messages`)).key;

    // 2. Create the message data
    const messageData = {
      message: newMessage,
      senderId: myUid,
      currenttime: new Date()
        .toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
        .toLowerCase(),
      // Note: If your Android app crashes when receiving web messages, 
      // change Date.now() to String(Date.now()) so it matches your Java model.
      timestamp: Date.now(), 
    };

    // 3. Prepare simultaneous updates for BOTH rooms
    const updates = {};
    updates[`chats/${senderRoom}/messages/${newMessageKey}`] = messageData;
    updates[`chats/${receiverRoom}/messages/${newMessageKey}`] = messageData;

    // 4. Execute the update
    try {
      await update(ref(db), updates);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (!selectedUser || isFrozen) {
    return (
      <div className="chatViewer chatViewer-empty">
        <h3>{isFrozen 
        ? "Chats are currently frozen. Please come back at 6:00 AM." 
        : "Select a chat to start messaging"}</h3>
      </div>
    );
  }

  return (
    <div className="chatViewer">
      <div className="chatViewer-header">
        <button 
            className="mobile-back-btn"
            onClick={() => setSelectedUser(null)}
        >
            <FaArrowLeft/>
        </button>
        {selectedUser.User_Name}</div>
      <div className="chatViewer-main">
        <div className="message-list">
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                textAlign:
                  msg.senderId === auth.currentUser?.uid ? "right" : "left",
                margin: "10px 0",
              }}
            >
              <Message senderId={msg.senderId} currentUser={auth.currentUser?.uid} msg={msg} />
              {/* <div
                style={{
                  display: "inline-block",
                  padding: "8px 12px",
                  borderRadius: "10px",
                  backgroundColor:
                    msg.senderId === auth.currentUser?.uid
                      ? "#00e5ff"
                      : "#e0e0e0",
                  color:
                    msg.senderId === auth.currentUser?.uid ? "white" : "black",
                }}>
                <p style={{ margin: 0 }}>{msg.message}</p>
                <span style={{ fontSize: "10px", opacity: 0.7 }}>
                  {msg.currenttime}
                </span>
              </div> */}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div
          className="message-input"
          style={{
            display: "flex",
            padding: "10px",
            borderTop: "1px solid #ccc",
          }}
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            style={{
              flexGrow: 1,
              padding: "10px",
              borderRadius: "20px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              marginLeft: "10px",
              padding: "10px 20px",
              borderRadius: "20px",
              border: "none",
              backgroundColor: "#00e5ff",
              color: "white",
              cursor: "pointer",
            }}
          >
            send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatViewer;