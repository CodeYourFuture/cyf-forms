import decode from 'jwt-decode'
import axios from 'axios'

export const getHeaders = () => {
  const idToken = localStorage.getItem('cyf_forms_id_token')
  if (idToken) {
    return {
      Authorization: `Bearer ${idToken}`,
      application: 'application-process'
    }
  }
  return null
}

export const setDefaultAxiosHeaders = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
  axios.defaults.headers.common.application = 'application-process'
}
export const setToken = idToken => {
  // Saves user token to localStorage
  localStorage.setItem('cyf_forms_id_token', idToken)
}

export const getToken = () => {
  // Retrieves the user token from localStorage
  const token = localStorage.getItem('cyf_forms_id_token')
  if (token) {
    return token
  }
  return null
}

export const isAdminTrue = token => {
  try {
    const decoded = decode(token)
    if (!decoded.admin) {
      return true
    }
    return false
  } catch (err) {
    return true
  }
}
// Checks if user is admin
export const isAdmin = () => {
  // Checks if there is a saved token and it's still valid
  const token = getToken()
  return !!token && !isAdminTrue(token) // handwaiving here
}

export const logout = () => {
  // Clear user token and profile data from localStorage
  localStorage.removeItem('cyf_forms_id_token')
  delete axios.defaults.headers.common.Authorization
  window.location.reload(true)
}
export const isTokenExpired = token => {
  try {
    const decoded = decode(token)
    if (decoded.exp < Date.now() / 1000) {
      logout()
      return true
    }
    return false
  } catch (err) {
    return true
  }
}
export const loggedIn = () => {
  // Checks if there is a saved token and it's still valid
  const token = getToken()
  // return true
  //
  return !!token && !isTokenExpired(token) // handwaiving here
}

export const getProfile = () => {
  const token = getToken()
  if (!!token) {
    return decode(getToken())
  }
  return null
}
