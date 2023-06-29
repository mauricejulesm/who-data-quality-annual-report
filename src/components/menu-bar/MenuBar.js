import React from 'react'
import { NavLink } from 'react-router-dom';
import './menubar.css'
import logo from '../../assets/images/WHO_logo.png'

const MenuBar = () => {
  return (
    <div className='menubarContainer'>
      <div className='logoContainer'>
        <ul>
          <li>
            <img src={logo} alt="Image" className='logoImage' />
          </li>
          <li>
            WHO Data Quality Annual Report
          </li>
          <li>
            <NavLink to="/">Annual Report</NavLink>
            </li>
            <li>
              <NavLink to="/configurations">Configurations</NavLink>
            </li>
        </ul>
      </div>
    </div>

  )
}

export default MenuBar