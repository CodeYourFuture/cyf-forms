export const SUBMIT_FORM = 'SUBMIT_FORM';

export const submitForm = (name, values) => ({
    type: SUBMIT_FORM,
    values,
});
