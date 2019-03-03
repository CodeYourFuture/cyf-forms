import React from 'react';
import { reduxForm } from 'redux-form';

const ApplicationFormThanks = () => (
    <div className="applicationForm_thankYou">
        Thank you! #NailedIt
    </div>
);

export default reduxForm({
    form: 'applicationForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(ApplicationFormThanks);
