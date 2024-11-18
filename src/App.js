import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import ReduxThunk from 'redux-thunk'
import './App.css'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'
import reducers from './Redux/Reducer'
import Routes from './Routes'
import * as AuthService from './layout/AuthService'

if (AuthService.getToken()) {
  AuthService.setDefaultAxiosHeaders(AuthService.getToken())
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(ReduxThunk))
)

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Navbar />
        <div className="main">
          <Routes />
        </div>
        <Footer />
      </div>
    </Router>
  </Provider>
)

export default App
