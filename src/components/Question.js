import React from 'react';
import PropTypes from 'prop-types';
import './Question.css';

const Question = ({ title, description, isRequired, children }) => (
    <div className={"question" + (isRequired ? " question-isRequired" : "")}>
        <label className="question_title">{ title }</label>
        {description && <div className="question_description">{description}</div>}
        {children}
    </div>
);

Question.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    isRequired: PropTypes.bool,
    children: PropTypes.element.isRequired,
};

export default Question;
