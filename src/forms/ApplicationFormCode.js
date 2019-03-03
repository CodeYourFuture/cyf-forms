import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import MultipleChoiceQuestion from '../components/MultipleChoiceQuestion';
import Button from '../components/Button';
import ShortAnswerQuestion from "../components/ShortAnswerQuestion";

const ApplicationFormCode = ({ onSubmit, onBack }) => (
    <form autoComplete="off" className="applicationForm" onSubmit={onSubmit}>
        <ShortAnswerQuestion title="In what other programming areas do you have experience?" name="otherCodeExperience" />
        <MultipleChoiceQuestion
            title="Awesome. Would you be available to help during our classes on Sundays?"
            name="availableOnSundays"
            options={[
                'Yes',
                'No',
            ]}
            required={true}
        />
        <Button title="Back" type="button" onClick={onBack} />
        <Button title="Next" type="submit" />
    </form>
);

ApplicationFormCode.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default reduxForm({
    form: 'applicationForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(ApplicationFormCode);
