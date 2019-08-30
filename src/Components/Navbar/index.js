import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import logo_CYF_square from '../../images/logo-CYF-square.png'
import Profile from '../../images/profile.svg'
import * as AuthService from '../../Layout/AuthService'
import logo from '../../logo-cyf.png'
import { recordEvent } from '../../Tracking/index'
import './Navbar.css'

export default class Navbar extends React.Component {
  onLogOut = () => {
    AuthService.logout()
    window.location.reload(true)
  }

  render() {
    const loggedIn = AuthService.loggedIn()

    return (
      <div className="navbar-div">
        <nav className="navbar navbar-expand-lg navbar-light container">
          {!loggedIn && (
            <a className="navbar-brand" href="/">
              <img src={logo} alt="logo" width="170" height="50" />
            </a>
          )}
          {loggedIn && (
            <a className="navbar-brand" href="/">
              <img src={logo_CYF_square} alt="logo" width="80" height="50" />
            </a>
          )}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              {loggedIn && (
                <li className="nav-item">
                  <Link className="nav-link nav-btn" to="/">
                    Home
                  </Link>
                  <span className="sr-only">(current)</span>
                </li>
              )}

              {loggedIn && (
                <li className="nav-item">
                  <Link
                    onClick={() => recordEvent('Sign up', 'Main Page')}
                    className="nav-link nav-btn"
                    to="/sign-up"
                  >
                    Sign up
                  </Link>
                </li>
              )}
              {loggedIn && (
                <li className="nav-item">
                  <Link className="nav-link nav-btn" to="/login">
                    Login
                  </Link>
                </li>
              )}
              {loggedIn && (
                <li className="nav-item">
                  <span className="sr-only">(current)</span>
                </li>
              )}
              {loggedIn && <li className="nav-item desktop-display-none" />}
              {loggedIn && (
                <Fragment>
                  <li className="nav-item desktop-display-none">
                    <Link className="nav-link nav-btn" to="/Resources">
                      Help
                    </Link>
                  </li>
                  <hr className="m-1 w-25" />
                  <li className="nav-item desktop-display-none">
                    <span
                      className="nav-link logout-btn"
                      onClick={this.onLogOut}
                      onKeyDown={this.onLogOut}
                      role="button"
                      tabIndex={0}
                    >
                      Log Out
                    </span>
                  </li>
                </Fragment>
              )}
            </ul>
            {loggedIn && (
              <button
                type="button"
                onClick={this.helpSlider}
                className="nav-link nav-btn-help media-display-none"
              >
                Help
              </button>
            )}
            {loggedIn && (
              <div className="dropdown media-display-none">
                <img
                  src={Profile}
                  alt="profile"
                  className="dropdown-toggle profile-icon"
                  data-toggle="dropdown"
                />
                <div className="dropdown-menu">
                  <span className="arrow-up-div">
                    <span className="arrow-up" />
                  </span>
                  <div className="dropdown-menu-items">
                    <Link className="dropdown-item nav-btn" to="/dashboard">
                      Your Profile
                    </Link>

                    <hr className="m-1" />
                    <span
                      className="logout-btn dropdown-item"
                      onClick={this.onLogOut}
                      onKeyDown={this.onLogOut}
                      role="button"
                      tabIndex={0}
                    >
                      Log Out
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    )
  }
}
