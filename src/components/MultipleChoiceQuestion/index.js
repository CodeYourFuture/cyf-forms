import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import ChoiceQuestion from '../ChoiceQuestion';

const MultipleChoiceQuestion = ({title, name, options, isRequired}) => (
    <ChoiceQuestion title={title} isRequired={isRequired}>
        <Fragment>
            {options.map((value, n) => (
                <label className="question_choice" key={n}>
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
        </Fragment>
    </ChoiceQuestion>
);

MultipleChoiceQuestion.propTypes = {
    isRequired: PropTypes.bool,
};

export default MultipleChoiceQuestion;
