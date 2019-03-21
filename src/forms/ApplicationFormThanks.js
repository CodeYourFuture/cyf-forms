import React from 'react';
import { reduxForm } from 'redux-form';

const ApplicationFormThanks = () => (
    <div className="applicationForm_thankYou">
        <h2>#NailedIt</h2>
        <p>Thank you! Your submission is now on its way to us.</p>
    </div>
);

export default reduxForm({
    form: 'applicationForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(ApplicationFormThanks);
