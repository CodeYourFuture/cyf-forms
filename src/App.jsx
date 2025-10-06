import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import './App.css'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'
import reducers from './Redux/Reducer'
import Routes from './Routes'

const store = configureStore({
  reducer: reducers
})

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
