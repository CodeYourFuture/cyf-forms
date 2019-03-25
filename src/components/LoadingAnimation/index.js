import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import loadingAnimation from './loadingAnimation.svg';

const LoadingAnimation = ({ isVisible = false }) => (
    <img
        src={loadingAnimation}
        alt="Loading"
        className={"loadingAnimation" + (isVisible ? " loadingAnimation-isVisible" : "")}
    />
);

LoadingAnimation.propTypes = {
    isVisible: PropTypes.bool.isRequired,
};

export default LoadingAnimation;
