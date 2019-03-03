import React from 'react';
import Question from './Question';
import { Field } from 'redux-form';

const EmailQuestion = ({title, name, required}) => (
    <Question title={title}>
        <Field
            name={name}
            component="input"
            type="email"
            placeholder="Type your email here..."
            required={required}
            className="question_shortAnswer question_emailAnswer"
        />
    </Question>
);

export default EmailQuestion;
