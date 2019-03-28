import React from 'react';
import PropTypes from 'prop-types';
import loadingAnimation from './loadingAnimation.svg';
import './index.css';

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
