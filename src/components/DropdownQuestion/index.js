import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import Question from "../Question";
import "./index.css";

const DropdownQuestion = ({
  title,
  description,
  name,
  options,
  isRequired
}) => {
  return (
    <Question title={title} description={description} isRequired={isRequired}>
      <Field
        name={name}
        component="select"
        className="question_dropdownAnswer"
        required={isRequired}
      >
        <option value="" disabled={true}>
          Choose an option
      </option>
        {options && options.map((value, n) => (
          <option key={n} value={value.name}>
            {value.name}
          </option>
        ))}
      </Field>
    </Question>
  )
};

DropdownQuestion.propTypes = {
  isRequired: PropTypes.bool
};

export default DropdownQuestion;
