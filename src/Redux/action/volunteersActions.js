import axios from 'axios'
import { domain, appPath } from '../../config'
import { CREAT_VOLUNTEER } from './types'
const path = `${domain()}${appPath}`

export const createVolunteer = async volunteer => {
  try {
    const response = await axios.post(`${path}`, volunteer)
    return response.data
  } catch (err) {
    if (
      err.response &&
      err.response.data &&
      err.response.data.error === 'EMAIL_EXIST'
    ) {
      return {
        err: 'Volunteer account with this email address already exist.'
      }
    }
    return {
      err: 'Something went wrong, please try again later.'
    }
  }
}

export const setVolunteerToStore = volunteer => {
  return {
    type: CREAT_VOLUNTEER,
    volunteer
  }
}
export const createVolunteerHandler = volunteer => {
  return async dispatch => {
    const data = await createVolunteer(volunteer)
    dispatch(setVolunteerToStore(data))
  }
}
