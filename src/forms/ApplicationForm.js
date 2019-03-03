import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ApplicationFormGeneral from './ApplicationFormGeneral';
import ApplicationFormCode from './ApplicationFormCode';
import ApplicationFormOps from './ApplicationFormOps';

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
        const { onSubmit } = this.props;
        const { page } = this.state;
        return (
            <div>
                {page === 1 && <ApplicationFormGeneral onSubmit={this.nextPage} />}
                {page === 2 && <ApplicationFormCode onSubmit={this.nextPage} onBack={this.previousPage} />}
                {page === 3 && <ApplicationFormOps onSubmit={onSubmit} onBack={this.previousPage} />}
            </div>
        )
    }
}

ApplicationForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default ApplicationForm;
