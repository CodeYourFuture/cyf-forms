import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question';
import { Field } from 'redux-form';

const EmailQuestion = ({title, name, isRequired}) => (
    <Question title={title} isRequired={isRequired}>
        <Field
            name={name}
            component="input"
            type="email"
            placeholder="Type your email here..."
            required={isRequired}
            className="question_shortAnswer question_emailAnswer"
        />
    </Question>
);

EmailQuestion.propTypes = {
    isRequired: PropTypes.bool,
};

export default EmailQuestion;
