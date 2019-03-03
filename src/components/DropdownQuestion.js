import React from 'react';
import Question from './Question';
import { Field } from 'redux-form';

const DropdownQuestion = ({title, name, options}) => (
    <Question title={title}>
        <Field name={name} component="select" className="question_dropdownAnswer">
            <option value="" disabled="true" selected="true">Choose an option</option>
            {options.map((value, n) => (
                <option key={n} value={value}>{value}</option>
            ))}
        </Field>
    </Question>
);

export default DropdownQuestion;
