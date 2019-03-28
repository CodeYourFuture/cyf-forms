import React from 'react';
import PropTypes from 'prop-types';
import Question from '../Question';
import { Field } from 'redux-form';
import './index.css';

const ShortAnswerQuestion = ({title, description, name, placeholder = 'Type your answer here...', type = 'text', isRequired, className = ''}) => (
    <Question title={title} isRequired={isRequired} description={description}>
        <Field
            name={name}
            component="input"
            type={type}
            placeholder={placeholder}
            required={isRequired}
            className={"question_shortAnswer " + className}
        />
    </Question>
);

ShortAnswerQuestion.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    isRequired: PropTypes.bool,
    className: PropTypes.string,
};

export default ShortAnswerQuestion;
