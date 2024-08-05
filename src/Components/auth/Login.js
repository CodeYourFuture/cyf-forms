import React, { useEffect, useState } from 'react'
import * as AuthService from '../../layout/AuthService'
import { useNavigate, useParams } from 'react-router-dom'

const GitHubLogIn = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { token } = params
  const [error, setError] = useState(null)

  useEffect(() => {
    const redirectUser = async token => {
      if (token) {
        await AuthService.setToken(token)
        navigate('/')
      } else {
        setError('No token provided, please make sure you have the right URL')
      }
    }
    redirectUser(token)
  }, [navigate, token])

  return (
    <div className="sign-in">{error && <p className="error">{error}</p>}</div>
  )
}

export default GitHubLogIn
