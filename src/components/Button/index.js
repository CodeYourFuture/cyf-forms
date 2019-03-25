import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Button = props => {
    const { title, ...otherProps } = props;
    return (
        <button className="button" {...otherProps}>{title}</button>
    );
};

Button.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Button;
