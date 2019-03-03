import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = props => {
    const { title } = props;
    return (
        <button className="button" {...props}>{title}</button>
    );
};

Button.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Button;
