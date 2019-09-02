import axios from 'axios'
import { GET_CITIES } from './types'

import { domain } from '../../config'

export const getCities = async () => {
  try {
    const Cities = await axios.get(`${domain()}/cities`)
    return Cities.data
  } catch (err) {
    return {
      success: false,
      err: 'Something went wrong, please try again later.'
    }
  }
}

export const setCities = cities => {
  return {
    type: GET_CITIES,
    cities
  }
}
export const loadCities = () => {
  return async dispatch => {
    const data = await getCities()
    dispatch(setCities(data))
  }
}
