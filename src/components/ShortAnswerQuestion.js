import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question';
import { Field } from 'redux-form';

const ShortAnswerQuestion = ({title, name, isRequired}) => (
    <Question title={title} isRequired={isRequired}>
        <Field
            name={name}
            component="input"
            type="text"
            placeholder="Type your answer here..."
            required={isRequired}
            className="question_shortAnswer"
        />
    </Question>
);

ShortAnswerQuestion.propTypes = {
    isRequired: PropTypes.bool,
};

export default ShortAnswerQuestion;
