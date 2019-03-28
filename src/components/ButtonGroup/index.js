import React from 'react';
import PropTypes from 'prop-types';
import LoadingAnimation from '../LoadingAnimation';
import './index.css';

const ButtonGroup = ({ children, isSubmissionInProgress = false }) => (
    <div className="buttonGroup">
        {children}
        <LoadingAnimation isVisible={isSubmissionInProgress} />
    </div>
);

ButtonGroup.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
    ]).isRequired,
    isSubmissionInProgress: PropTypes.bool,
};

export default ButtonGroup;
