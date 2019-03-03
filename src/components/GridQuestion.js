import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question';
import { Field } from 'redux-form';

const GridQuestion = ({title, name, options, scaleLabelLowest, scaleLabelHighest}) => (
    <Question title={title}>
        <table className="question_grid">
            <thead>
                <tr>
                    <th></th>
                    <th>1 ★{scaleLabelLowest &&
                        <span className="question_grid_label">{scaleLabelLowest}</span>
                    }</th>
                    <th>2 ★</th>
                    <th>3 ★</th>
                    <th>4 ★</th>
                    <th>5 ★{scaleLabelHighest &&
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
    </Question>
);

GridQuestion.propTypes = {
    options: PropTypes.array.isRequired,
};

export default GridQuestion;
