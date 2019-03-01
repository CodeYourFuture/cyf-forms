import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = (props) => (
    <button className="button" {...props}>{props.title}</button>
);

Button.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Button;
