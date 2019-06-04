import React, { lazy, Suspense, Component } from 'react';
import PropTypes from 'prop-types';
import LoadingAnimation from '../components/LoadingAnimation';
const ApplicationFormGeneral = lazy(() => import('./ApplicationFormGeneral'));
const ApplicationFormCode = lazy(() => import('./ApplicationFormCode'));
const ApplicationFormOps = lazy(() => import('./ApplicationFormOps'));
const ApplicationFormThanks = lazy(() => import('./ApplicationFormThanks'));

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
        const { onSubmit, values, hasSubmissionSucceeded } = this.props;
        const { page } = this.state;
        const stage = hasSubmissionSucceeded === true ? 4 : page;

        const isInterestedInCode = values.fieldsOfInterest && values.fieldsOfInterest['Teaching code or agile methodologies'] === true;
        const isInterestedInOps = values.fieldsOfInterest && values.fieldsOfInterest['Running and growing the organisation'] === true;

        const fallbackElement = <LoadingAnimation isVisible={true} />;

        const stages = {
            1: <Suspense fallback={fallbackElement}>
                <ApplicationFormGeneral onSubmit={this.nextPage} />
              </Suspense>,
            2: isInterestedInCode
                ? <Suspense fallback={fallbackElement}>
                    <ApplicationFormCode
                      onSubmit={isInterestedInOps ? this.nextPage : onSubmit}
                      previousPage={this.previousPage}
                      nextButtonLabel={isInterestedInOps ? "Next" : "Submit"}
                    />
                  </Suspense>
                : <Suspense fallback={fallbackElement}>
                    <ApplicationFormOps
                      onSubmit={onSubmit}
                      previousPage={this.previousPage}
                      nextButtonLabel="Submit"
                    />
                  </Suspense>,
            3: isInterestedInCode && isInterestedInOps
                ? <Suspense fallback={fallbackElement}>
                    <ApplicationFormOps
                      onSubmit={onSubmit}
                      previousPage={this.previousPage}
                      nextButtonLabel="Submit"
                     />
                  </Suspense>
                : <Suspense fallback={fallbackElement}>
                    <ApplicationFormThanks />
                  </Suspense>,
            4: <Suspense fallback={fallbackElement}>
                 <ApplicationFormThanks />
              </Suspense>,
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
    isSubmissionInProgress: PropTypes.bool.isRequired,
    hasSubmissionSucceeded: PropTypes.bool.isRequired,
};

export default ApplicationForm;
