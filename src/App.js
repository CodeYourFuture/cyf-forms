import React from 'react';
import './App.css';
import ApplicationForm from './forms/ApplicationForm';

import './App.css';

export default () => (
    <div className="app">
        <ApplicationForm onSubmit={() => console.log('submitted!')} />
    </div>
);
