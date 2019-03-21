import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question';
import { Field } from 'redux-form';

const ShortAnswerQuestion = ({title, description, name, isRequired}) => (
    <Question title={title} isRequired={isRequired} description={description}>
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
    title: PropTypes.string,
    description: PropTypes.string,
    isRequired: PropTypes.bool,
};

export default ShortAnswerQuestion;
