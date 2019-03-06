import { connect } from 'react-redux';
import ButtonGroup from '../components/ButtonGroup';

const mapStateToProps = (state) => ({
    isSubmissionInProgress: !!state.api.isInProgress,
});

const SubmitButtonGroup = connect(
    mapStateToProps
)(ButtonGroup);

export default SubmitButtonGroup;
