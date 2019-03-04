import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import GridQuestion from "../components/GridQuestion";
import MultipleChoiceQuestion from '../components/MultipleChoiceQuestion';
import Button from '../components/Button';
import ShortAnswerQuestion from "../components/ShortAnswerQuestion";

const ApplicationFormCode = ({ onSubmit, onBack, invalid, nextButtonLabel }) => (
    <form autoComplete="off" className="applicationForm" onSubmit={onSubmit}>
        <h2>Teaching code or agile methodologies</h2>
        <GridQuestion
            title="How much experience do you have in these areas?"
            name="codeExperience"
            options={[
                'HTML/CSS',
                'JavaScript',
                'Backend/Database',
                'Agile Methodologies',
            ]}
            scaleLabelLowest="Novice"
            scaleLabelHighest="Expert"
        />
        <ShortAnswerQuestion title="In what other programming areas do you have experience?" name="otherCodeExperience" />
        <MultipleChoiceQuestion
            title="Awesome. Would you be available to help during our classes on Sundays?"
            name="availableOnSundays"
            options={[
                'Yes',
                'No',
            ]}
            isRequired={true}
        />
        <Button title="Back" type="button" onClick={onBack} />
        <Button title={nextButtonLabel || 'Next'} type="submit" disabled={invalid} />
    </form>
);

ApplicationFormCode.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    nextButtonLabel: PropTypes.string,
};

const validate = values => ({
    availableOnSundays: values.availableOnSundays !== 'Yes',
});

export default reduxForm({
    form: 'applicationForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate,
})(ApplicationFormCode);
