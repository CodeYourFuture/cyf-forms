import { apiEndpoints } from '../utils/apiEndpoints';

export const SUBMIT_FORM = 'SUBMIT_FORM';

export const submitForm = () => ({
    type: SUBMIT_FORM,
});

export const postForm = (name, values) => dispatch => {
    dispatch(submitForm());
    return fetch(apiEndpoints[name], {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    });
};
