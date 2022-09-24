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
    for (let i = 0; i < data.cities.length; i++) {
      if (data.cities[i].visibleIn) {
        if (!data.cities[i].visibleIn.includes('VOLUNTEER_FORM')) {
          data.cities.splice(i, 1)
        }
      } else {
        data.cities.splice(i, 1)
      }
    }
    dispatch(setCities(data))
  }
}
