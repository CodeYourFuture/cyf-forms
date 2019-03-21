import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import CheckboxesQuestion from '../components/CheckboxesQuestion';
import Button from '../components/Button';
import SubmitButtonGroup from "../containers/SubmitButtonGroup";

import * as validators from '../utils/validators';

const ApplicationFormOps = ({ handleSubmit, previousPage, invalid, nextButtonLabel }) => (
    <form autoComplete="off" className="applicationForm" onSubmit={handleSubmit}>
        <h2>Running and growing the organisation</h2>
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
                'Volunteer Engagement / Community Management',
                'Project Management / Business Analysis',
                'Graduate Job Placement (Recruitment)',
                'Event Management',
                'Personal Support Work / Wellbeing',
                'Pedagogy / Learning Environments',
            ].sort()}
            required={true}
        />
        <CheckboxesQuestion
            title="Awesome. When would you be available to help?"
            name="availability"
            options={[
                'During our classes on Saturdays/Sundays',
                'During the week',
                'Other',
            ]}
            isRequired={true}
        />
        <SubmitButtonGroup>
            <Button title="Back" type="button" onClick={previousPage} />
            <Button title={nextButtonLabel || 'Next'} type="submit" disabled={invalid} />
        </SubmitButtonGroup>
    </form>
);

ApplicationFormOps.propTypes = {
    nextButtonLabel: PropTypes.string,
};

const validate = values => ({
    availability: {
        'Other': validators.required(values.availability),
    },
});

export default reduxForm({
    form: 'applicationForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate,
})(ApplicationFormOps);
