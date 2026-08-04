import { React, useState } from 'react'
import VerifyIcon from "../../img/VerifyIcon.png"
import "./VerifyScreen.css"
import { useNavigate } from 'react-router-dom'
import {auth,db} from "../../services/firebase"
import {ref, set} from "firebase/database"
import {deleteUser} from 'firebase/auth'

const VerifyScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const checkVerificationAndSave = async () => {
    setLoading(true);
    try{
      // Get the currently logged-in user
      const user = auth.currentUser;

      if(!user){
        alert("No user found. Please go back and signup again.");
        setLoading(false);
        return;
      }
      //Fetching the latest status from the server
      await user.reload();

      //Check whether the Email is verified
      if(user.emailVerified){
        // Retrieving data from browser's temporary storage
        const tempStorage = localStorage.getItem('tempUserData');
        
        if(!tempStorage){
          alert("We lost your profile data. Please sign up again");
          //! Delete user if data is lost from local storage
          try{
            await deleteUser(user);

            navigate(`/signUp`);
          }catch(deleteError){
            console.error("Error deleting incomplete account:", deleteError);
            alert("Failed to reset account.");
          }
          return;
        }
        const userData = JSON.parse(tempStorage);

        // Saving everything on realtime database
        await set(ref(db, 'Users/' + user.uid), {
          id: user.uid,
          Email: userData.email,
          User_Name: userData.username,
          First_Name: userData.firstName,
          Last_Name: userData.lastName,
          Birth_Date: userData.birthDate,
          Phone_Number: userData.phoneNumber,
          image_url: "default",
          status: "offline",
          search: `${userData.firstName.toLowerCase()} ${userData.lastName.toLowerCase()}`
        });

        //cleanUp local Storage
        localStorage.removeItem('tempUserData');

        alert("Account verified and created successfully!");

        navigate(`/profileImage`);

      }else{
        alert("Email not verified yet! Please check your inbox (and spam folder) and click the link.");
      }
    }catch(error){
      console.error("Error during verification check:", error);
      alert(`An error occurred: ${error.message}`);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="verify-wrapper">
        <div className="verify-container">
            <img src={VerifyIcon} alt="Verify Icon" className='verify-icon' />
            <h1 className='verifyHeading'>Verify Your Email Address</h1>
            <p className='verify-text'>The Verification Email is sent to your given Email address please verify to continue</p>
            <button className='btn' onClick={checkVerificationAndSave} disabled={loading}>Verify</button>
            {loading&&<div className='loading'>Loading...</div>}
        </div>

    </div>
  )
}

export default VerifyScreen
