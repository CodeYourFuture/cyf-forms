import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Question from '../Question';
import TableResponsive from '../TableResponsive';
import './index.css';

const GridQuestion = ({title, name, options, scaleLabelLowest, scaleLabelHighest}) => (
    <Question title={title}>
        <TableResponsive>
            <table className="question_grid">
                <thead>
                    <tr>
                        <th></th>
                        <th>1&nbsp;★{scaleLabelLowest &&
                            <span className="question_grid_label">{scaleLabelLowest}</span>
                        }</th>
                        <th>2&nbsp;★</th>
                        <th>3&nbsp;★</th>
                        <th>4&nbsp;★</th>
                        <th>5&nbsp;★{scaleLabelHighest &&
                            <span className="question_grid_label">{scaleLabelHighest}</span>
                        }</th>
                    </tr>
                </thead>
                <tbody>
                {options.map((value, n) => (
                    <tr key={n}>
                        <th>{value}</th>
                        {Array(5).fill(0).map((empty, n) => (
                            <td key={n}>
                                <label>
                                    <Field
                                        name={`${name}['${value}']`}
                                        component="input"
                                        type="radio"
                                        value={String(n+1)}
                                    />
                                </label>
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </TableResponsive>
    </Question>
);

GridQuestion.propTypes = {
    options: PropTypes.array.isRequired,
};

export default GridQuestion;
