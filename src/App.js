import WelcomeScreen from './pages/WelcomScreen/WelcomeScreen';
import './index.css';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './pages/LoginScreen/LoginScreen';
import SignUpScreen from './pages/SignUpScreen/SignUpScreen';
import VerifyScreen from './pages/VerifyScreen/VerifyScreen';
import ProfileImage from './pages/ProfileImage/ProfileImage';
import MainScreen from './pages/MainScreen/MainScreen';
import SearchFragment from './component/SearchFragment/SearchFragment';
import ProfileFragment from './component/ProfileFragment/ProfileFragment';
import Chats from './component/Chats/Chats';
import { useEffect, useState } from 'react';
import PublicRoute from './router/PublicRoute';
import PrivateRoute from './router/PrivateRoute';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import SplashScreen from './component/SplashScreen/SplashScreen';
import OnboardingRoute from './router/OnboardingRoute';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
      setUser(currentUser);
      setTimeout(()=>{
        setIsAuthLoading(false);
      },1500)
    });
    return () => unsubscribe();
  },[]);

  if(isAuthLoading){
    return <SplashScreen/>
  }

  return (
    <HashRouter>
      <Routes>
        {/* PUBLIC ROUTES (Only accessible if NOT logged in) */}
        <Route path="/" element={<PublicRoute user={user}><WelcomeScreen /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute user={user}><LoginScreen /></PublicRoute>} />
        <Route path="/signUp" element={<PublicRoute user={user}><SignUpScreen /></PublicRoute>} />
        
        {/* Depending on your flow, verify/profileImage might be private or public */}
        <Route path="/verify" element={<OnboardingRoute user={user}><VerifyScreen /></OnboardingRoute>} />
        <Route path="/profileImage" element={<OnboardingRoute user={user}><ProfileImage /></OnboardingRoute>} />

        {/* PRIVATE ROUTES (Only accessible IF logged in) */}
        <Route path="/main" element={<PrivateRoute user={user}><MainScreen /></PrivateRoute>}>
          {/* Automatically redirect /main to /main/chats */}
          <Route index element={<Navigate to="chats" replace />} /> 
          <Route path="chats" element={<Chats />} />

          <Route path="chat/:id" element={<Chats />} />
          
          <Route path="search" element={<SearchFragment />} />
          <Route path="profile" element={<ProfileFragment />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
