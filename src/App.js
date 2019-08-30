import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { applyMiddleware, createStore } from 'redux'
import ReduxThunk from 'redux-thunk'
import './App.css'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'
import * as AuthService from './Layout/AuthService'
import reducers from './Redux/Reducer'
import Routes from './Routes'

if (AuthService.getToken()) {
  AuthService.setDefaultAxiosHeaders(AuthService.getToken())
}

const store = createStore(reducers, applyMiddleware(ReduxThunk))
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
