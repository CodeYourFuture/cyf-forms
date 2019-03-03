import React from 'react';
import PropTypes from 'prop-types';
import './Question.css';

const Question = ({ title, children, description }) => (
    <div className="question">
        <label className="question_title">{ title }</label>
        {description && <div className="question_description">{description}</div>}
        {children}
    </div>
);

Question.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    children: PropTypes.element.isRequired
};

export default Question;
