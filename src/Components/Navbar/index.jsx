import React from 'react'
import logo from '../../images/logo-CYF-square.png'
import './Navbar.css'

export default () => {
  return (
    <div className="navbar-div">
      <nav className="navbar navbar-expand-lg navbar-light container">
        <span className="navbar-brand">
          <img src={logo} alt="logo" width="80" height="50" />
        </span>
      </nav>
    </div>
  )
}
