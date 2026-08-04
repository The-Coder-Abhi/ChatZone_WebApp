import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../services/firebase";
import { ref, get } from "firebase/database";
import { signOut } from "firebase/auth";
import "./ProfileFragment.css"

const ProfileFragment = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const useRef = ref(db, `Users/${user.uid}`);
        const snapshot = await get(useRef);
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          console.log("User doesn't exist");
        }
      }
    };
    fetchUserData();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign Out Error", error);
      });
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="profile">  
          <img src={userData.image_url} alt="profile" className="profile-img" />
          <h2>{userData.User_Name}</h2>
        </div>
        <div className="profile-details">
          <p><b>First Name:</b> {userData.First_Name}</p>
          <p><b>Last Name:</b> {userData.Last_Name}</p>
          <p><b>DOB:</b> {userData.Birth_Date}</p>
          <p><b>Phone:</b> {userData.Phone_Number}</p>
        </div>
        <button onClick={handleSignOut} className="signout-button">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default ProfileFragment;
