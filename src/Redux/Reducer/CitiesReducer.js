import { GET_CITIES } from '../action/types'

const INITIAL_STATE = {
  cities: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CITIES:
      return {
        ...state,
        cities: action.cities.cities
      }
    default:
      return state
  }
}
