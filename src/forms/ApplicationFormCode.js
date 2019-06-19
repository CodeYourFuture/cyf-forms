import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import GridQuestion from "../components/GridQuestion";
import MultipleChoiceQuestion from "../components/MultipleChoiceQuestion";
import Button from "../components/Button";
import SubmitButtonGroup from "../containers/SubmitButtonGroup";
import ShortAnswerQuestion from "../components/ShortAnswerQuestion";

const ApplicationFormCode = ({
  handleSubmit,
  previousPage,
  invalid,
  nextButtonLabel
}) => (
  <form autoComplete="off" className="applicationForm" onSubmit={handleSubmit}>
    <h2>Teaching code or agile methodologies</h2>
    <GridQuestion
      title="What is your level of expertise in the following areas?"
      name="codeExpertise"
      options={[
        "HTML/CSS",
        "JavaScript",
        "React",
        "Node/SQL",
        "Agile Methodologies"
      ]}
      scaleLabelLowest="Novice"
      scaleLabelHighest="Expert"
    />
    <ShortAnswerQuestion
      title="What other web development related expertise could you bring to CYF?"
      name="otherCodeExpertise"
    />
    <MultipleChoiceQuestion
      title="Are you currently volunteering?"
      name="currentlyVolunteering"
      options={["Yes", "No"]}
    />
    <MultipleChoiceQuestion
      title="Awesome. Would you be available to help during our classes on Saturdays/Sundays?"
      name="availableOnWeekends"
      options={["Yes", "No"]}
      isRequired={true}
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

ApplicationFormCode.propTypes = {
  nextButtonLabel: PropTypes.string
};

const validate = values => ({
  availableOnWeekends: values.availableOnWeekends !== "Yes"
});

export default reduxForm({
  form: "applicationForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(ApplicationFormCode);
