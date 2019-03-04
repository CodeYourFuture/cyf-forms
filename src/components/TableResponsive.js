import React from 'react';
import PropTypes from 'prop-types';
import './TableResponsive.css';

const TableResponsive = ({ children }) => (
    <div className="tableResponsive">
        {children}
    </div>
);

TableResponsive.propTypes = {
    children: PropTypes.element.isRequired,
};

export default TableResponsive;
