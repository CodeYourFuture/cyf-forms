import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import ShortAnswerQuestion from '../components/ShortAnswerQuestion';
import EmailQuestion from '../components/EmailQuestion';
import CheckboxesQuestion from '../components/CheckboxesQuestion';
import DropdownQuestion from '../components/DropdownQuestion';
import Button from '../components/Button';

const ApplicationFormGeneral = ({ handleSubmit }) => (
    <form autoComplete="off" className="applicationForm" onSubmit={handleSubmit}>
        <ShortAnswerQuestion title="What's your first name?" name="firstName" required={true} />
        <ShortAnswerQuestion title="And what's your last name?" name="lastName" />
        <ShortAnswerQuestion title="Where do you live?" name="placeOfResidence" />
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
        <EmailQuestion title="What's your email address?" name="email" required={true} />
        <CheckboxesQuestion
            title="Cool. What are you interested in helping with?"
            name="fieldOfInterest"
            options={[
                'Teaching code or agile methodologies',
                'Running and growing the organisation',
            ]}
            required={true}
        />
        <Button title="Next" type="submit" />
    </form>
);

ApplicationFormGeneral.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
    form: 'applicationForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(ApplicationFormGeneral);
