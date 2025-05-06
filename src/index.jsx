import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import * as Tracking from './Tracking/index'

// Google Analytics
Tracking.initialise()

createRoot(document.getElementById('root')).render(<App />)
