import React, { useState, useEffect, Fragment } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import LoginLogo from './Loginlogo.svg'
import { loggedIn } from '../../layout/AuthService'
import EmailLogin from './EmailLogin'
import Loading from '../Loading'
import { GoogleIcon, GithubIcon } from './icons'
import { domain, appPath } from '../../config'
import './index.css'

const path = `${domain()}${appPath}`

const renderMessage = msg => (
  <div>
    <div style={{ padding: '5%' }}>
      <p className="success" style={{ fontSize: '24px' }}>
        {msg}
      </p>
    </div>
  </div>
)

const SignIn = () => {
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    if (loggedIn()) navigate('/')
  })

  const handleSubmit = async e => {
    e.preventDefault()
    if (email) {
      setLoading(true)
      try {
        const magicLinkRequest = await axios.post(`${path}/login`, {
          email
        })
        if (magicLinkRequest.status === 200) {
          setMsg(
            <>
              Please check your email.<br></br> We have sent you a link that
              will take you to the volunteer registration form.<br></br> This
              email can take a few minutes to arrive, please be patient.
            </>
          )
          setLoading(false)
        }
      } catch (err) {
        console.log(err)
        if (err.response.data.err) {
          // eslint-disable-next-line no-console
          setErr(err.response.data.err)
          setLoading(false)
        } else {
          setErr(
            'Sorry, we are currently experiencing technical issues, please try again later.'
          )
          setLoading(false)
        }
      }
    }
  }

  const onChange = e => {
    setEmail(e.target.value)
  }

  if (loading) {
    return <Loading />
  }
  return (
    <div className="sign-in">
      {msg && renderMessage(msg)}
      {!msg && (
        <Fragment>
          <div className="sign-logo-div">
            <img src={LoginLogo} alt="Logo" className="sign-logo" />
            <div style={{ marginLeft: '2rem', marginBottom: '2rem' }}>
              <div style={{ font: '1rem' }}>
                <h2>Volunteer Portal</h2>
              </div>
            </div>
          </div>
          <div className="container-sign">
            <div className="login-div">
              <EmailLogin
                onChange={onChange}
                email={email}
                handleSubmit={handleSubmit}
                error={err}
              />
              <a
                className="btn sign-up-google-btn"
                href={`${domain()}/auth/google-volunteer`}
              >
                <GoogleIcon />
                Log in with Google
              </a>
              <a
                className="btn sign-up-github-btn"
                href={`${domain()}/auth/github-volunteer`}
              >
                <GithubIcon />
                Log in with Github
              </a>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default SignIn
