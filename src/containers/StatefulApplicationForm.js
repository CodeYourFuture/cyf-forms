import { connect } from 'react-redux';
import ApplicationForm from '../forms/ApplicationForm';

const mapStateToProps = (state) => {
    return {
        values: state.form.applicationForm && state.form.applicationForm.values ? state.form.applicationForm.values : {},
        onSubmit: () => {
            console.log('submitted!');
        },
    };
};

const StatefulApplicationForm = connect(
    mapStateToProps
)(ApplicationForm);

export default StatefulApplicationForm;
