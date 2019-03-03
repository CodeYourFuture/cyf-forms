import React from 'react';
import Question from './Question';
import { Field } from 'redux-form';

const MultipleChoiceQuestion = ({title, name, options}) => (
    <Question title={title}>
        <div className="question_answers">
            {options.map((value, n) => (
                <label className="question_checkboxesAnswer" key={n}>
                    <Field
                        name={name}
                        component="input"
                        type="radio"
                        value={value}
                    />
                    {value}
                </label>
            ))}
        </div>
    </Question>
);

export default MultipleChoiceQuestion;
