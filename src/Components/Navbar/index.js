import React from 'react'
import logo from '../../logo-cyf.png'
import './Navbar.css'

export default () => {
  return (
    <div className="navbar-div">
      <nav className="navbar navbar-expand-lg navbar-light container">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="logo" width="170" height="50" />
        </a>
      </nav>
    </div>
  )
}
