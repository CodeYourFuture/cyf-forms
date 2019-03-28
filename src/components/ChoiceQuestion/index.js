import React from 'react';
import PropTypes from 'prop-types';
import Question from '../Question';
import './index.css';

const ChoiceQuestion = ({title, description, name, isRequired, children}) => (
    <Question title={title} description={description} isRequired={isRequired}>
        {children}
    </Question>
);

ChoiceQuestion.propTypes = {
    isRequired: PropTypes.bool,
    children: PropTypes.element.isRequired,
};

export default ChoiceQuestion;
