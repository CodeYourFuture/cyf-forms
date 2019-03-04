import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ApplicationFormGeneral from './ApplicationFormGeneral';
import ApplicationFormCode from './ApplicationFormCode';
import ApplicationFormOps from './ApplicationFormOps';
import ApplicationFormThanks from './ApplicationFormThanks';

class ApplicationForm extends Component {
    constructor(props) {
        super(props);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.state = {
            page: 1
        };
    }

    nextPage() {
        this.setState({ page: this.state.page + 1 });
    }

    previousPage() {
        this.setState({ page: this.state.page - 1 });
    }

    render() {
        const { onSubmit, values, isSubmitted } = this.props;
        const { page } = this.state;
        const stage = isSubmitted ? 4 : page;

        const isInterestedInCode = values.fieldsOfInterest && values.fieldsOfInterest['Teaching code or agile methodologies'] === true;
        const isInterestedInOps = values.fieldsOfInterest && values.fieldsOfInterest['Running and growing the organisation'] === true;

        const stages = {
            1: <ApplicationFormGeneral onSubmit={this.nextPage} />,
            2: isInterestedInCode
                ? <ApplicationFormCode
                    onSubmit={this.nextPage}
                    previousPage={this.previousPage}
                    nextButtonLabel={isInterestedInOps ? "Next" : "Submit"}
                  />
                : <ApplicationFormOps
                    onSubmit={onSubmit}
                    previousPage={this.previousPage}
                    nextButtonLabel="Submit"
                  />,
            3: isInterestedInCode && isInterestedInOps
                ? <ApplicationFormOps
                    onSubmit={onSubmit}
                    previousPage={this.previousPage}
                    nextButtonLabel="Submit"
                   />
                : <ApplicationFormThanks />,
            4: <ApplicationFormThanks />,
        };

        return (
            <div>
                <h1>CYF Volunteer Application Form</h1>
                {stages[stage]}
            </div>
        )
    }
}

ApplicationForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    isSubmitted: PropTypes.bool.isRequired,
};

export default ApplicationForm;
