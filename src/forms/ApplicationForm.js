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
        const { onSubmit, values } = this.props;
        const { page } = this.state;

        const isInterestedInCode = values.fieldOfInterest && values.fieldOfInterest['Teaching code or agile methodologies'] === true;
        const isInterestedInOps = values.fieldOfInterest && values.fieldOfInterest['Running and growing the organisation'] === true;

        const stages = {
            1: <ApplicationFormGeneral onSubmit={this.nextPage} />,
            2: isInterestedInCode
                ? <ApplicationFormCode
                    onSubmit={this.nextPage}
                    onBack={this.previousPage}
                    nextButtonLabel={isInterestedInOps ? "Next" : "Submit"}
                  />
                : <ApplicationFormOps
                    onSubmit={onSubmit}
                    onBack={this.previousPage}
                    nextButtonLabel="Submit"
                  />,
            3: isInterestedInCode && isInterestedInOps
                ? <ApplicationFormOps
                    onSubmit={onSubmit}
                    onBack={this.previousPage}
                    nextButtonLabel="Submit"
                   />
                : <ApplicationFormThanks />,
            4: !isInterestedInCode && isInterestedInOps
                ? <ApplicationFormThanks />
                : '',
        };
        return (
            <div>{stages[page]}</div>
        )
    }
}

ApplicationForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default ApplicationForm;
