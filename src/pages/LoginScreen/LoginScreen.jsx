import {useState} from 'react'
import { FaEnvelope, FaKey, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import "./LoginScreen.css"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import CustomAlertBox from '../../component/CustomAlertBox/CustomAlertBox';

const LoginScreen = () => {
  const navigate = useNavigate();

  // Input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

    // State for Custom Alert
    const [alertMessage, setAlertMessage] = useState(null);
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if(!email || !password){
      setAlertMessage("email and password can't be empty");
      return;
    }
    setLoading(true);

    try{
      await signInWithEmailAndPassword(auth, email, password);
      // navigate('/main/profile');
      // navigate('/main');
    }catch(error){
      console.error("Error signing in", error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        setAlertMessage("Invalid email or password. Please try again.");
      } else {
        setAlertMessage(`Login failed: ${error.message}`);
      }
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="login-Wrapper">
      {alertMessage && <CustomAlertBox alertMessage={alertMessage} setAlertMessage={setAlertMessage}/>}
      <div className="login-Container" >
        <h1 className="login-title">Sign In:</h1>
        <form onSubmit={handleSignIn} className="login-form">
          {/* Email Field */}
          <div className="input-group">
          <label>Email</label>
          <div className="input-container">
            <FaEnvelope className="input-icon" />
            <input type="email" placeholder="abc@mail.com" onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          </div>
          {/* Password Field */}
          <div className="input-group">
            <label>Password:</label>
            <div className="input-container">
              <FaKey className="input-icon"/>
              <input type={showPassword ? "text" : "password"} 
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              required
              />
              {/* Toggle Eye Icon */}
              <div className="eye-Icon" onClick={togglePasswordVisibility}>
                {showPassword ? FaEyeSlash : FaEye}
              </div>
            </div>
          </div>
          {/* Submit Button */}
          <button type='submit' className='login-btn'>SIGN IN</button>
          {loading&&<div className='loading'>Loading...</div>}
        </form>
        {/* Bottom Text */}
        <p className="bottom-text">
          Don't have an account ? <Link to="/signup" className='link'>Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginScreen
