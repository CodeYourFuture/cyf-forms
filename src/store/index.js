import { START_FORM_SUBMISSION, END_FORM_SUBMISSION } from '../actions';
import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

const api = (state = { isInProgress: false, hasSucceeded: false }, action) => {
    switch (action.type) {
        case START_FORM_SUBMISSION:
            return {
                ...state,
                isInProgress: true,
            };

        case END_FORM_SUBMISSION:
            return {
                ...state,
                isInProgress: false,
                hasSucceeded: action.hasSucceeded,
            };

        default:
            return state;
    }
};

export default combineReducers({
    api,
    form,
});
