import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question';
import { Field } from 'redux-form';

const DropdownQuestion = ({title, name, options, isRequired}) => (
    <Question title={title} isRequired={isRequired}>
        <Field name={name} component="select" className="question_dropdownAnswer" required={isRequired}>
            <option value="" disabled={true}>Choose an option</option>
            {options.map((value, n) => (
                <option key={n} value={value}>{value}</option>
            ))}
        </Field>
    </Question>
);

DropdownQuestion.propTypes = {
    isRequired: PropTypes.bool,
};

export default DropdownQuestion;
