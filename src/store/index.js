import { SUBMIT_FORM } from '../actions';
import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

const isSubmitted = (state = false, action) => {
    switch (action.type) {
        case SUBMIT_FORM:
            return true;

        default:
            return state;
    }
};

export default combineReducers({
    isSubmitted,
    form,
});
