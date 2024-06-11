import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as AuthService from '../../layout/AuthService'
import LoginLogo from './Loginlogo.svg'
import './index.css'
import { domain } from '../../config'

class GitHubLogIn extends Component {
  componentDidMount() {
    if (AuthService.loggedIn()) this.props.history.replace('/')
  }

  render() {
    return (
      <div className="sign-in">
        <div className="sign-logo-div">
          <img src={LoginLogo} alt="Logo" className="sign-logo" />
          <div style={{ marginLeft: '2rem', marginBottom: '2rem' }}>
            <div style={{ font: '1rem' }}>
              <h2>Volunteer Portal</h2>
            </div>
          </div>
        </div>
        <div className="container-Sign">
          <div className="register-buttons">
            <a
              className="btn sign-up-google-btn btn-next"
              href={`${domain()}/auth/google-applicant`}
            >
              <svg
                width="22px"
                height="22px"
                viewBox="0 0 28 28"
                style={{ marginRight: '10px', marginTop: '-2px' }}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 10.2812H23.3281C23.4531 10.9792 23.5156 11.6458 23.5156 12.2812C23.5156 14.5417 23.0417 16.5599 22.0938 18.3359C21.1458 20.112 19.7943 21.5 18.0391 22.5C16.2839 23.5 14.2708 24 12 24C10.3646 24 8.80729 23.6849 7.32813 23.0547C5.84896 22.4245 4.57292 21.5729 3.5 20.5C2.42708 19.4271 1.57552 18.151 0.945313 16.6719C0.315104 15.1927 0 13.6354 0 12C0 10.3646 0.315104 8.80729 0.945313 7.32812C1.57552 5.84896 2.42708 4.57292 3.5 3.5C4.57292 2.42708 5.84896 1.57552 7.32813 0.945312C8.80729 0.315104 10.3646 0 12 0C15.125 0 17.8073 1.04687 20.0469 3.14062L16.7813 6.28125C15.5 5.04167 13.9063 4.42187 12 4.42187C10.6563 4.42187 9.41406 4.76042 8.27344 5.4375C7.13281 6.11458 6.22917 7.03385 5.5625 8.19531C4.89583 9.35677 4.5625 10.625 4.5625 12C4.5625 13.375 4.89583 14.6432 5.5625 15.8047C6.22917 16.9661 7.13281 17.8854 8.27344 18.5625C9.41406 19.2396 10.6563 19.5781 12 19.5781C12.9063 19.5781 13.7396 19.4531 14.5 19.2031C15.2604 18.9531 15.8854 18.6406 16.375 18.2656C16.8646 17.8906 17.2917 17.4635 17.6563 16.9844C18.0208 16.5052 18.2891 16.0521 18.4609 15.625C18.6328 15.1979 18.75 14.7917 18.8125 14.4062H12V10.2812Z"
                  fill="white"
                />
              </svg>
              Register with Google
            </a>
            <a
              className="btn sign-up-github-btn btn-next2"
              href={`${domain()}/auth/github-volunteer`}
            >
              <svg
                width="22px"
                height="22px"
                viewBox="0 0 28 28"
                style={{ marginRight: '10px', marginTop: '-10px' }}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 0C6.26855 0 0 6.26855 0 14C0 20.1865 4.011 25.4331 9.57458 27.2839C10.2744 27.4121 10.5299 26.9797 10.5299 26.6106C10.5299 26.2773 10.5171 25.1733 10.5103 24.0044C6.61719 24.8503 5.7943 22.3535 5.7943 22.3535C5.15687 20.7368 4.23998 20.3062 4.23998 20.3062C2.96764 19.438 4.3365 19.4551 4.3365 19.4551C5.74213 19.5525 6.48216 20.8975 6.48216 20.8975C7.73145 23.0371 9.76 22.4185 10.5564 22.0596C10.6836 21.1572 11.0459 20.5386 11.4451 20.1899C8.33727 19.8362 5.068 18.6348 5.068 13.2702C5.068 11.7407 5.61403 10.4932 6.50781 9.51305C6.36511 9.15759 5.88317 7.73314 6.64623 5.80628C6.64623 5.80628 7.82031 5.4303 10.4966 7.24183C11.6125 6.92994 12.8097 6.77614 14 6.771C15.1894 6.77614 16.3874 6.93164 17.5051 7.24352C20.1763 5.4303 21.3521 5.80798 21.3521 5.80798C22.1177 7.73656 21.6357 9.15928 21.4922 9.51305C22.3894 10.4932 22.9312 11.7407 22.9312 13.2702C22.9312 18.6484 19.6567 19.8327 16.5379 20.1797C17.042 20.6138 17.4881 21.4648 17.4881 22.7705C17.4881 24.6419 17.4692 26.1509 17.4692 26.6123C17.4692 26.9849 17.7239 27.4206 18.4331 27.2839C23.9924 25.4297 28 20.1831 28 14C28 6.26855 21.7314 0 14 0Z"
                  fill="white"
                />
              </svg>
              Register with Github
            </a>
          </div>
        </div>
        <div className="register-b">
          Don't have Google or Github?
          <Link className="buttons-register" to="/">
            &nbsp;Sign up with email
          </Link>
        </div>
      </div>
    )
  }
}

export default GitHubLogIn
