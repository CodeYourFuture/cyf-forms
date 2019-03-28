import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const TableResponsive = ({ children }) => (
    <div className="tableResponsive">
        {children}
    </div>
);

TableResponsive.propTypes = {
    children: PropTypes.element.isRequired,
};

export default TableResponsive;
