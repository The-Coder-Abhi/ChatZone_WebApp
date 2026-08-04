import React from 'react'
import { Outlet } from 'react-router-dom';
import FragmentMenu from '../../component/FragmentMenu/FragmentMenu'
import Header from '../../component/Header/Header'
import { useState, useEffect } from 'react';
import { ref, onValue, onDisconnect, set, get } from 'firebase/database';
import { auth, db } from '../../services/firebase';
import CustomAlertBox from '../../component/CustomAlertBox/CustomAlertBox';
import "./MainScreen.css"

const MainScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState(null);
  // State for Custom Alert
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
  const user = auth.currentUser;
  if (!user) return;

  const userStatusDatabaseRef = ref(db, '/Users/' + user.uid + '/status');
  const connectedRef = ref(db, '.info/connected');

  const unsubscribe = onValue(connectedRef, (snap) => {
    if (snap.val() === true) {

      onDisconnect(userStatusDatabaseRef).set('offline').then(() => {

        set(userStatusDatabaseRef, 'online');
      });
    }
  });

  return () => unsubscribe();
}, []);

useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const fetchPhoneNumber = async () => {
      const userRef = ref(db, `/Users/${user.uid}/phoneNumber`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        setPhoneNumber(snapshot.val());
      }
    };
    
    fetchPhoneNumber();

    //30 minutes in milliseconds
    const timeLimit = 30 * 60 * 1000; 

    const usageTimer = setTimeout(() => {
      console.log("30 minutes reached!");
      
      // Android App is CApable of sending SMS directly, but for web, we can only show an alert.
      setAlertMessage(`Time limit reached! A warning SMS would be sent to: ${phoneNumber || 'the registered number'}`);
      
    }, timeLimit);

    return () => clearTimeout(usageTimer);
    
  }, [phoneNumber]); 


  return (
    <div className="mainScreen_Wrapper">
      {alertMessage && <CustomAlertBox alertMessage={alertMessage} setAlertMessage={setAlertMessage}/>}
        <div className="mainScreen_Container">
          <div className="sidebar-section">
            <FragmentMenu/>
          </div>
          <div className="main-section">
          <Header/>
          <div className="content-section">
            <Outlet/>
          </div>
          </div>
        </div>
    </div>
  )
}

export default MainScreen
