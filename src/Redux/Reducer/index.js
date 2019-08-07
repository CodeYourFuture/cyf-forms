import { combineReducers } from 'redux'
import volunteer from './VolunteerReducer'
import cities from './CitiesReducer'

export default combineReducers({
  volunteer,
  cities
})
