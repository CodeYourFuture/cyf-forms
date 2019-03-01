import React from 'react';
import Question from './Question';
import { Field } from 'redux-form';

import './CheckboxesQuestion.css';

const CheckboxesQuestion = ({title, name, options}) => (
    <Question title={title}>
        <div className="checkboxesQuestion_answers">
        {Object.keys(options).map((value, n) => (
            <label className="checkboxesQuestion_answer" key={n}>
                <Field
                    name={`${name}[${value}]`}
                    component="input"
                    type="checkbox"
                    value="checked"
                />{' '}
                {options[value]}
            </label>
        ))}
        </div>
    </Question>
);

export default CheckboxesQuestion;
