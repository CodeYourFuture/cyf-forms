import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import ShortAnswerQuestion from '../components/ShortAnswerQuestion';
import EmailQuestion from '../components/EmailQuestion';
import CheckboxesQuestion from '../components/CheckboxesQuestion';
import DropdownQuestion from '../components/DropdownQuestion';
import Button from '../components/Button';

import * as validators from '../utils/validators';

const ApplicationFormGeneral = ({ handleSubmit, invalid }) => {
    return (
    <form autoComplete="off" className="applicationForm" onSubmit={handleSubmit}>
        <p>So, you're interested in volunteering for CodeYourFuture?
            Fantastic! We just need a few pieces of information to help us get organised and welcome you.
        </p>
        <ShortAnswerQuestion title="What's your first name?" name="firstName" isRequired={true} />
        <ShortAnswerQuestion title="And what's your last name?" name="lastName" />
        <ShortAnswerQuestion title="What city do you live in?" name="placeOfResidence" />
        <DropdownQuestion
            title="Which CYF city is nearest to you?"
            name="placeOfInterest"
            options={[
                'London',
                'Manchester',
                'Glasgow',
                'Rome',
                'Bogotá',
            ]}
        />
        <EmailQuestion title="What's your email address?" name="email" isRequired={true} />
        <CheckboxesQuestion
            title="Cool. What are you interested in helping with?"
            name="fieldsOfInterest"
            options={[
                'Teaching code or agile methodologies',
                'Running and growing the organisation',
            ]}
            isRequired={true}
        />
        <Button title="Next" type="submit" disabled={invalid} />
    </form>
)};

ApplicationFormGeneral.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

const validate = values => ({
    firstName: validators.required(values.firstName),
    email: validators.required(values.email),
    fieldsOfInterest: {
        'Teaching code or agile methodologies': validators.required(values.fieldsOfInterest),
    },
});

export default reduxForm({
    form: 'applicationForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate,
})(ApplicationFormGeneral);
