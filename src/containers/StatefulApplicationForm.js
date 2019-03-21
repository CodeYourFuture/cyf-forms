import { connect } from 'react-redux';
import ApplicationForm from '../forms/ApplicationForm';
import { postForm } from '../actions';

const mapStateToProps = (state) => ({
    onSubmit: (values, dispatch, props) => dispatch(postForm(props.form, values)),
    values: state.form.applicationForm && state.form.applicationForm.values
        ? state.form.applicationForm.values
        : {},
    isSubmissionInProgress: !!state.api.isInProgress,
    hasSubmissionSucceeded: !!state.api.hasSucceeded,
});

const StatefulApplicationForm = connect(
    mapStateToProps
)(ApplicationForm);

export default StatefulApplicationForm;
