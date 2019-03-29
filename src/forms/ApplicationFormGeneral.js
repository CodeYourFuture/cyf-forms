import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import ShortAnswerQuestion from '../components/ShortAnswerQuestion';
import EmailQuestion from '../components/EmailQuestion';
import CheckboxesQuestion from '../components/MultipleAnswerQuestion';
import DropdownQuestion from '../components/DropdownQuestion';
import Button from '../components/Button';
import ButtonGroup from "../components/ButtonGroup";

import * as validators from '../utils/validators';

const ApplicationFormGeneral = ({ handleSubmit, invalid }) => (
    <form autoComplete="off" className="applicationForm" onSubmit={handleSubmit}>
        <p>So, you're interested in volunteering for CodeYourFuture?
            Fantastic! We just need a few pieces of information to help us get organised and welcome you.
        </p>
        <ShortAnswerQuestion title="What's your first name?" name="firstName" isRequired={true} />
        <ShortAnswerQuestion title="And what's your last name?" name="lastName" />
        <DropdownQuestion
            title="Which CYF city would you like to volunteer for?"
            description="Are you interested in bringing CYF to your city? Email us at contact@codeyourfuture.io."
            name="city"
            options={[
                'Cape Town (South Africa)',
                'London (UK)',
                'Manchester (UK)',
                'Glasgow (UK)',
                'Rome (Italy)',
                'Medellín (Colombia)',
            ].sort()}
            isRequired={true}
        />
        <EmailQuestion title="What's your email address?" name="email" isRequired={true} />
        <ShortAnswerQuestion
            title="What's your mobile number?"
            description="If you don't mind us contacting you this way"
            name="phone"
        />
        <CheckboxesQuestion
            title="Cool. What are you interested in helping with?"
            name="fieldsOfInterest"
            options={[
                'Teaching code or agile methodologies',
                'Running and growing the organisation',
            ]}
            isRequired={true}
        />
        <ButtonGroup>
            <Button title="Next" type="submit" disabled={invalid} />
        </ButtonGroup>
    </form>
);

ApplicationFormGeneral.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

const validate = values => ({
    firstName: validators.required(values.firstName),
    email: validators.required(values.email),
    city: validators.required(values.city),
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
