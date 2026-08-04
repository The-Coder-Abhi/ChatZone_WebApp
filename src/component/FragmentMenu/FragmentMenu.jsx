import React from 'react'
import "./FragmentMenu.css"
import{Link,NavLink} from 'react-router-dom'
import { FaEye,FaUser,FaSearch,FaComment } from 'react-icons/fa'

const FragmentMenu = () => {
  return (
    <div className="fragmentMenu_Wrapper">
        <div className="fragmentMenu_Container">
            <NavLink to="/main/chats" className="search_Fragment Fragments">
                <FaComment className='fragment_Icon'/>
            </NavLink>
            <NavLink to="/main/search" className="search_Fragment Fragments">
                <FaSearch className='fragment_Icon'/>
            </NavLink>
            <NavLink to="/main/profile" className="search_Fragment Fragments">
                <FaUser className='fragment_Icon'/>
            </NavLink>
        </div>
    </div>
  )
}

export default FragmentMenu
