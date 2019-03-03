import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './store';

import 'normalize.css';

const formElements = document.querySelectorAll('.cyf-form');

for (let n = 0; n < formElements.length; n++) {
    import(`./containers/Stateful${formElements[n].dataset.form.match(/[A-Za-z]+/)[0]}.js`).then(FormElement => {
        FormElement = FormElement.default;
        const store = createStore(
            rootReducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        );

        render(
            <Provider store={store}>
                <FormElement />
            </Provider>,
            formElements[n]
        );
    });
}
