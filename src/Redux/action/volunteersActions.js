import axios from 'axios'
import { domain } from '../../config'
import { CREAT_USER } from './types'

export const createUser = async user => {
  try {
    const response = await axios.post(`${domain()}/register`, user)
    return response.data
  } catch (err) {
    return {
      err: 'Something went wrong, please try again later.'
    }
  }
}

export const setUserToStore = user => {
  return {
    type: CREAT_USER,
    user
  }
}
export const createUserHandler = user => {
  return async dispatch => {
    const data = await createUser(user)
    dispatch(setUserToStore(data))
  }
}
