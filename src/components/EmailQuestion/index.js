import React from 'react';
import PropTypes from 'prop-types';
import ShortAnswerQuestion from '../ShortAnswerQuestion';

const EmailQuestion = ({title, description, name, isRequired}) => (
    <ShortAnswerQuestion
        title={title}
        description={description}
        name={name}
        placeholder="Type your email here..."
        isRequired={isRequired}
        className="question_emailAnswer"
    />
);

EmailQuestion.propTypes = {
    isRequired: PropTypes.bool,
};

export default EmailQuestion;
