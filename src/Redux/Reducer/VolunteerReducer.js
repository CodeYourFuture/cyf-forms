import { CREAT_VOLUNTEER } from '../action/types'

const INITIAL_STATE = {
  volunteer: {},
  err: ''
}
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREAT_VOLUNTEER:
      if (action.volunteer && action.volunteer.err) {
        return {
          ...state,
          err: action.volunteer.err
        }
      }
      return {
        ...state,
        volunteer: action.volunteer.volunteer
      }
    default:
      return state
  }
}
