import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import ChoiceQuestion from '../ChoiceQuestion';

const CheckboxesQuestion = ({title, name, options, isRequired}) => (
    <ChoiceQuestion title={title} description="Choose as many as you like" isRequired={isRequired}>
        {options.map((value, n) => (
            <label className="question_choice" key={n}>
                <Field
                    name={`${name}[${value}]`}
                    component="input"
                    type="checkbox"
                    value="checked"
                />
                {value}
            </label>
        ))}
    </ChoiceQuestion>
);

CheckboxesQuestion.propTypes = {
    isRequired: PropTypes.bool,
};

export default CheckboxesQuestion;
