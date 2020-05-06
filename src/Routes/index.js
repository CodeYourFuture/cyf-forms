import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Public from '../Layout/Public'
import Forms from '../Components/forms'
import NotFound from '../Components/NotFound'

export default () => (
  <Switch>
    <Public exact path="/" component={Forms} />
    <Public exact path="/code/:userId/:code?" component={Forms} />
    <Route path="*" component={NotFound} />
  </Switch>
)
