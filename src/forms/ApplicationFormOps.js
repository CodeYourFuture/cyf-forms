import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import CheckboxesQuestion from "../components/MultipleAnswerQuestion";
import Button from "../components/Button";
import SubmitButtonGroup from "../containers/SubmitButtonGroup";

import * as validators from "../utils/validators";

const skillSet = require("../utils/skills.json");

const ApplicationFormOps = ({
  handleSubmit,
  previousPage,
  invalid,
  nextButtonLabel
}) => (
  <form autoComplete="off" className="applicationForm" onSubmit={handleSubmit}>
    <h2>Running and growing the organisation</h2>
    <CheckboxesQuestion
      title="In which of these areas could you see yourself helping?"
      name="skillSets"
      options={skillSet}
      required={true}
    />
    <CheckboxesQuestion
      title="Awesome. When would you be available to help?"
      name="availability"
      options={{
        weekend: "During our classes on Saturdays/Sundays",
        weekday: "During the week",
        other: "Other"
      }}
    />
    <SubmitButtonGroup>
      <Button title="Back" type="button" onClick={previousPage} />
      <Button
        title={nextButtonLabel || "Next"}
        type="submit"
        disabled={invalid}
      />
    </SubmitButtonGroup>
  </form>
);

ApplicationFormOps.propTypes = {
  nextButtonLabel: PropTypes.string
};

const validate = values => {
  console.log({ values });
  return {
    availability: {
      Other: validators.required(values.availability)
    }
  };
};
export default reduxForm({
  form: "applicationForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(ApplicationFormOps);
