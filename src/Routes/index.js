import React from 'react'
import { Route, Switch, useLocation, useParams } from 'react-router-dom'

import Forms from '../Components/forms'
import NotFound from '../Components/NotFound'

function WithRouteProps({ children: Component }) {
  const location = useLocation()
  const params = useParams()
  return <Component location={location} match={{ params }} />
}

export default () => (
  <Switch>
    <Route exact path="/">
      <WithRouteProps children={Forms} />
    </Route>
    <Route exact path="/code/:userId/:code?">
      <WithRouteProps children={Forms} />
    </Route>
    <Route path="*">
      <NotFound />
    </Route>
  </Switch>
)
