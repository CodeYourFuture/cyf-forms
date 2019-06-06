export const apiEndpoints = {
    applicationForm: process.env.REACT_APP_NODE_ENV === 'TESTING'
        ? 'http://localhost:3100'
        : 'https://script.google.com/macros/s/AKfycbyztQc4ZQuC_DVcMETR0pC5hU5FkvswbTYeyFmsmhiMNJtfgtp3/exec',
};
