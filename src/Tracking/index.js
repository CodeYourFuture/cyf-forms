import ReactGA from 'react-ga'
import { env, GA_CONFIG } from '../config'

/**
 * recordEvent - Add custom tracking event.
 * @param {string} category
 * @param {string} action
 * @param {string} label
 */
const recordEvent = (action, label) => {
  ReactGA.event({
    category: `Volunteer form`,
    action,
    label
  })
}

const recordPageView = () => {
  ReactGA.pageview(window.location.pathname + window.location.search)
}

const initialise = () => {
  if (env === 'LOCAL') {
    ReactGA.initialize('LOCAL', {
      testMode: true,
      debug: true
    })
  } else {
    ReactGA.initialize(GA_CONFIG)
  }
  recordPageView(window.location.pathname + window.location.search)
}

export { initialise, recordEvent, recordPageView }
