import React from 'react';
import { reduxForm } from 'redux-form';

import ShortAnswerQuestion from '../components/ShortAnswerQuestion';
import EmailQuestion from '../components/EmailQuestion';
import CheckboxesQuestion from '../components/CheckboxesQuestion';
import Button from '../components/Button';

const ApplicationFormFirstPage = ({ handleSubmit }) => (
    <form autoComplete="off" className="applicationForm" onSubmit={handleSubmit}>
        <ShortAnswerQuestion title="What's your first name?" name="firstName" required={true} />
        <ShortAnswerQuestion title="And what's your last name?" name="lastName" />
        <ShortAnswerQuestion title="Where do you live?" name="placeOfResidence" />
        <ShortAnswerQuestion title="Which CYF city is nearest to you?" name="placeOfInterest" />
        <EmailQuestion title="What's your email address?" name="email" />
        <CheckboxesQuestion
            title="Cool. What are you interested in helping with?"
            name="fieldOfInterest"
            options={{
                code: 'Teaching code or agile methodologies',
                ops: 'Running and growing the organisation',
            }}
            required={true}
        />
        <Button title="Next" type="submit" />
    </form>
);

export default reduxForm({
    form: 'applicationForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(ApplicationFormFirstPage);
