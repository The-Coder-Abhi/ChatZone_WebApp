import {useEffect, useState} from 'react'
import {ref,onValue} from 'firebase/database'
import {db} from '../../services/firebase.js'
import {data} from "../../data.js"
import { useLocation } from 'react-router-dom';
import "./Chats.css"
import ChatViewer from '../ChatViewer/ChatViewer.jsx'
import ChatRecyclerView from '../ChatRecyclerView/ChatRecyclerView.jsx'

const Chats = () => {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(location.state?.chatUser || null);

  useEffect(() => {
    if (location.state?.chatUser) {
      setSelectedUser(location.state.chatUser);
    }
  }, [location.state]);

  useEffect(()=>{
    const usersRef = ref(db,'Users');

    const unsubscribe = onValue(usersRef,(snapshot)=>{
      const usersArray = [];
      snapshot.forEach((childSnapshot)=>{
        usersArray.push({
          id:childSnapshot.key,
        ...childSnapshot.val()
        });
      });
      setUsers(usersArray);
    });
    return () => unsubscribe();
  },[]);
  console.log(data);
  return (
    <div className="chats-wrapper">
      <div className={`chats-container ${selectedUser ? 'chat-is-active' : ''}`}>
        <div className="chats">
          {users.map((item) => (
            <ChatRecyclerView 
              key={item.id} 
              name={item.User_Name} // Adjust keys based on your Firebase schema
              img={item.image_url} 
              status={item.status} 
              onClick={() => setSelectedUser(item)}
            />
          ))}
        </div>
        <ChatViewer selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      </div>
    </div>
  )
}

export default Chats
