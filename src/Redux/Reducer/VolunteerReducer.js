import { CREAT_USER } from '../action/types'

const INITIAL_STATE = {
  user: {},
  err: ''
}
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREAT_USER:
      if (action.user && action.user.err) {
        return {
          ...state,
          err: action.user.err
        }
      }
      return {
        ...state,
        user: action.user.user
      }
    default:
      return state
  }
}
