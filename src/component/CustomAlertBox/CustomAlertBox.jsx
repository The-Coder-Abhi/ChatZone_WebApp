import React from 'react'
import './CustomAlertBox.css'

const CustomAlertBox = ({alertMessage, setAlertMessage}) => {
  return (
    <div className="custom-alert-overlay">
          <div className="custom-alert-box">
            <h3>Notice</h3>
            <p>{alertMessage}</p>
            <button onClick={() => setAlertMessage(null)}>OK</button>
          </div>
    </div>
  )
}

export default CustomAlertBox
