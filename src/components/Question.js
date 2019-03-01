import React from 'react';
import PropTypes from 'prop-types';
import './Question.css';

const Question = ({ title, children }) => (
    <div className="question">
        <label className="question_title">{ title }</label>
        {children}
    </div>
);

Question.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
};

export default Question;
