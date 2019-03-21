import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question';
import { Field } from 'redux-form';

const CheckboxesQuestion = ({title, name, options, isRequired}) => (
    <Question title={title} description="Choose as many as you like" isRequired={isRequired}>
        <div className="question_answers">
            {options.map((value, n) => (
                <label className="question_checkboxesAnswer" key={n}>
                    <Field
                        name={`${name}[${value}]`}
                        component="input"
                        type="checkbox"
                        value="checked"
                    />
                    {value}
                </label>
            ))}
        </div>
    </Question>
);

CheckboxesQuestion.propTypes = {
    isRequired: PropTypes.bool,
};

export default CheckboxesQuestion;
