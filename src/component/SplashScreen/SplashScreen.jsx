import Logo from '../../img/NewChatZone2.0.png'
import "./SplashScreen.css"

const SplashScreen = () => {
  
  return (
    <div>
        <div className='SplashScreen_Wrapper'>
        <div className='SplashScreen_Container'>
          <div className="logo-container">
            <img src={Logo} alt="ChatZone" />
          </div>
          <div className='Owner_Container'>
            <h5>Created By</h5>
            <h1>Abhishek</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SplashScreen
