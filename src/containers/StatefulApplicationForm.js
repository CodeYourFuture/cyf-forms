import { connect } from 'react-redux';
import ApplicationForm from '../forms/ApplicationForm';
import { postForm } from '../actions';

const mapStateToProps = (state) => {
    return {
        onSubmit: (values, dispatch, props) => {
            console.log(props.form, values);
            dispatch(postForm(props.form, values));
        },
        values: state.form.applicationForm && state.form.applicationForm.values
            ? state.form.applicationForm.values
            : {},
        isSubmitted: !!state.isSubmitted,
    };
};

const StatefulApplicationForm = connect(
    mapStateToProps
)(ApplicationForm);

export default StatefulApplicationForm;
