import React from 'react'
import ReactDOM from 'react-dom'
import * as Tracking from './Tracking/index'
import App from './App'

// Google Analytics
Tracking.initialise()

ReactDOM.render(<App />, document.getElementById('root'))
