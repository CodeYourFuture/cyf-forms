import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import CheckboxesQuestion from '../components/CheckboxesQuestion';
import Button from '../components/Button';

import * as validators from '../utils/validators';

const ApplicationFormOps = ({ onSubmit, onBack, invalid, nextButtonLabel }) => (
    <form autoComplete="off" className="applicationForm" onSubmit={onSubmit}>
        <CheckboxesQuestion
            title="In which of these areas could you see yourself helping?"
            name="skillSets"
            options={[
                'Coaching',
                'Journalism / Writing',
                'Photography / Videography',
                'Growth Marketing / Social Media Strategy',
                'NGO and Corporate Outreach / Fundraising / Partnerships',
                'Accounting / Bookkeeping',
                'Volunteer Engagement',
                'Project Management / Business Analysis',
                'Recruitment',
                'Event Management',
                'Personal Support Work / Wellbeing',
                'Pedagogy / Learning Environments',
            ]}
            required={true}
        />
        <CheckboxesQuestion
            title="Awesome. When would you be available to help?"
            name="availability"
            options={[
                'During our classes on Sundays',
                'During the week',
                'Varying, remotely',
            ]}
            isRequired={true}
        />
        <Button title="Back" type="button" onClick={onBack} />
        <Button title={nextButtonLabel || 'Next'} type="submit" disabled={invalid} />
    </form>
);

ApplicationFormOps.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    nextButtonLabel: PropTypes.string,
};

const validate = values => ({
    availability: {
        'Varying, remotely': validators.required(values.availability),
    },
});

export default reduxForm({
    form: 'applicationForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate,
})(ApplicationFormOps);
