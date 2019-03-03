import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question';
import { Field } from 'redux-form';

const MultipleChoiceQuestion = ({title, name, options, isRequired}) => (
    <Question title={title} isRequired={isRequired}>
        <div className="question_answers">
            {options.map((value, n) => (
                <label className="question_checkboxesAnswer" key={n}>
                    <Field
                        name={name}
                        component="input"
                        type="radio"
                        value={value}
                        required={isRequired}
                    />
                    {value}
                </label>
            ))}
        </div>
    </Question>
);

MultipleChoiceQuestion.propTypes = {
    isRequired: PropTypes.bool,
};

export default MultipleChoiceQuestion;
