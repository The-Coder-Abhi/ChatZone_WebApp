import {useEffect, useState} from 'react'
import {ref,onValue} from 'firebase/database'
import {db} from '../../services/firebase.js'
import {data} from "../../data.js"
import { useLocation } from 'react-router-dom';
import "./Chats.css"
import ChatViewer from '../ChatViewer/ChatViewer.jsx'
import ChatRecyclerView from '../ChatRecyclerView/ChatRecyclerView.jsx'
import CustomAlertBox from '../../component/CustomAlertBox/CustomAlertBox.jsx';

const Chats = () => {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(location.state?.chatUser || null);

  const [alertMessage, setAlertMessage] = useState(null);

  const currentHour = new Date().getHours();

  const isFrozen = currentHour >= 0 && currentHour < 13;

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
  // console.log(data);

  const handleChatClick = (item) => {
    if (isFrozen) {
      setAlertMessage("The chats are freezed come at 6:00am morning");
    } else {
      setSelectedUser(item);
    }
  };

  return (
    <div className="chats-wrapper">
      {alertMessage && <CustomAlertBox alertMessage={alertMessage} setAlertMessage={setAlertMessage} />}
      <div className={`chats-container ${selectedUser ? 'chat-is-active' : ''}`}>
        <div className="chats">
          {users.map((item) => (
            <ChatRecyclerView 
              key={item.id} 
              name={item.User_Name} // Adjust keys based on your Firebase schema
              img={item.image_url} 
              status={item.status} 
              isFrozen={isFrozen} // Pass frozen state to child for styling
              onClick={() => handleChatClick(item)}
            />
          ))}
        </div>
        <ChatViewer selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      </div>
    </div>
  )
}

export default Chats
