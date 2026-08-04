import React, { useState, useRef } from 'react'
import { FaCalendarAlt, FaPhone, FaKey, FaEnvelope, FaUser } from 'react-icons/fa';
import {Link, useNavigate} from "react-router-dom";
import {auth} from '../../services/firebase'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import "./SignUpScreen.css"
import CustomAlertBox from '../../component/CustomAlertBox/CustomAlertBox';

const SignUpScreen = () => {
  const navigate = useNavigate();
  const [userData,setUserData] = useState({
    firstName:'',
    lastName:'',
    birthDate:'',
    phoneNumber:'',
    username:'',
    email:'',
    password:'',
    confirmPassword:''
  });

  // State for Custom Alert
  const [alertMessage, setAlertMessage] = useState(null);

  //reference for date input
  const dateInputRef = useRef(null);

  const openDatePicker = () =>{
    if(dateInputRef.current){
      dateInputRef.current.showPicker();
    }
  };

  const [loading,setLoading] = useState(false);

  const handleChange = (e) =>{
    setUserData({...userData,[e.target.name]:e.target.value})
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    // If the birthday hasn't happened yet this year, subtract 1 from age
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  
  const handleSignUp = async (e) =>{
    e.preventDefault();//prevents page refresh
    const { firstName, lastName, birthDate, phoneNumber, username, email, password, confirmPassword } = userData;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    //Validating Input
    if (!firstName || !lastName || !email || !username || !password || !confirmPassword || !birthDate) {
      setAlertMessage("Input Fields Can't Be Empty");
      return;
    }
    if(password !== confirmPassword){
      setAlertMessage("Password and Confirm Password do not match");
      return;
    }
    if(password.length<6){
      setAlertMessage("Password Must be 6 Character Long");
      return;
    }
    if(!emailPattern.test(email)){
      setAlertMessage("Email is invalid.");
      return;
    }

    const userAge = calculateAge(birthDate);
    if (userAge < 5) {
      setAlertMessage("Sorry, you must be at least 5 years old to use Chatzone.");
      return;
    }
    if (userAge > 15) {
      setAlertMessage("Sorry, Chatzone is specifically designed for kids 15 and under.");
      return;
    }

    setLoading(true);

    try{
      //Creating User With FireBase Auth
      const userCredential = await createUserWithEmailAndPassword(auth,email,password);
      const user = userCredential.user;

      //Sending Verification Email
      await sendEmailVerification(user);

      //Temporarily save form data in the browser so the next screen can use it
      localStorage.setItem('tempUserData', JSON.stringify({
        firstName, lastName, birthDate, phoneNumber, username, email
      }));

    }catch(error){
      console.error("Error Signing up:",error);
      alert(`Registration Failed: ${error.message}`);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="signUp-wrapper">
      {alertMessage && <CustomAlertBox alertMessage={alertMessage} setAlertMessage={setAlertMessage}/>}
      <div className="signUp-container">
        <h1 className="signUp-title">Sign Up</h1>
        <form onSubmit={handleSignUp} className="signUp-form">

          {/* Name Input */}
          <div className="input-group">
            <label>Name:</label>
            <div className="name-row">
              <div className="input-container">
                <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required/>
              </div>
              <div className="input-container">
                <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required/>
              </div>
            </div>
          </div>

          {/* Birth Date Input */}
          <div className="input-group ">
            <label>Birth Date:</label>
            <div className="input-container">
              {/* <FaEnvelope className="input-icon" /> */}
              <div className="input-with-icon">
                <FaCalendarAlt className="input-icon" />
                <input type="date" name="birthDate" placeholder="DD/MM/YY" onChange={handleChange} value={userData.birthDate} ref={dateInputRef} required/>
              </div>
            <button type="button" className='select-btn' onClick={openDatePicker}>Select</button>
            </div>
          </div>

          {/* Phone Number */}
          <div className="input-group">
            <label>Phone Number:</label>
            <div className="input-container">
                <FaPhone className="input-icon" />
                <input type="tel" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required/>
            </div>
          </div>

          {/* User Name */}
          <div className="input-group">
            <label>Username:</label>
            <div className="input-container">
                <FaUser className="input-icon" />
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required/>
            </div>
          </div>

          {/* Email */}
          <div className="input-group">
            <label>Email</label>
            <div className="input-container">
                <FaEnvelope className="input-icon" />
                <input type="email" name="email" placeholder="abc@gmail.com" onChange={handleChange} required/>
            </div>
          </div>

          {/* Password */}
          <div className="input-group">
            <label>Password:</label>
            <div className="input-container">
                <FaKey className="input-icon" />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required/>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <label>Confirm Password:</label>
            <div className="input-container">
                <FaKey className="input-icon" />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required/>
            </div>
          </div>

          {/* Submit Button */}
          <button type='submit' className='signUp-btn' disabled={loading}>SIGN UP</button>
          {loading&&<div className='loading'>Loading...</div>}

        </form>

        {/* Bottom Text */}
        <p className="bottom-text">
          Already have an account ? <Link to="/login" className='link'>Sign In</Link>
        </p>
      </div>
    </div>
  )
}

export default SignUpScreen
