import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ApplicationFormFirstPage from './ApplicationFormFirstPage';

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
        const { page } = this.state;
        return (
            <div>
                {page === 1 && <ApplicationFormFirstPage onSubmit={this.nextPage} />}
                {page === 2 &&
                <div>second page</div>}
            </div>
        )
    }
}

ApplicationForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default ApplicationForm;
