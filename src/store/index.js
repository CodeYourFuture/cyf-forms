import {
  START_FORM_SUBMISSION,
  END_FORM_SUBMISSION,
  GET_CITIES
} from "../actions"
import { combineReducers } from "redux"
import { reducer as form } from "redux-form"

const api = (
  state = { isInProgress: false, hasSucceeded: false, cities: [] },
  action
) => {
  switch (action.type) {
    case START_FORM_SUBMISSION:
      return {
        ...state,
        isInProgress: true
      }

    case END_FORM_SUBMISSION:
      return {
        ...state,
        isInProgress: false,
        hasSucceeded: action.hasSucceeded
      }
    case GET_CITIES:
      return {
        ...state,
        cities: action.cities
      }

    default:
      return state
  }
}

export default combineReducers({
  api,
  form
})
