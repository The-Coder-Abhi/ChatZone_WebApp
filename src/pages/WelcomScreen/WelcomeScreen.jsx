import { useState, useEffect } from "react";
// import welcomeImg from "../../img/welcomeScreen.png"
import ChatCat from "../../img/ChatCats.png";
import SplashScreen from "../../component/SplashScreen/SplashScreen";
import { useNavigate } from "react-router-dom";
import "./WelcomeScreen.css";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="welcomeWrapper">
      <img src={ChatCat} alt="Chats" />
      <div className="welcomeText">
        <h3>Welcome To</h3>
        <h1>Chatzone</h1>
        <h4>The Chat Application For Kids</h4>
      </div>
      <div className="btn-wrapper">
        <button onClick={() => navigate(`/login`)} className="btn">
          SIGN IN
        </button>
        <button onClick={() => navigate(`/signUp`)} className="btn">
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
