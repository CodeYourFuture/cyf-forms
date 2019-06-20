import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store";
import thunk from "redux-thunk";

import "normalize.css";
import "./index.css";
import StateFulForm from "./containers/StatefulApplicationForm.js";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

render(
  <Provider store={store}>
    <StateFulForm />
  </Provider>,
  document.getElementById("cyf-form")
);
