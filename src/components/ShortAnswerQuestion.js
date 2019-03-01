import React from 'react';
import Question from './Question';
import { Field } from 'redux-form';

const ShortAnswerQuestion = ({title, name, required}) => (
    <Question title={title}>
        <Field
            name={name}
            component="input"
            type="text"
            placeholder="Type your answer here..."
            required={required}
            className="question_answer"
        />
    </Question>
);

export default ShortAnswerQuestion;
