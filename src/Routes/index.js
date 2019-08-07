import React from 'react'
import { Switch } from 'react-router-dom'
import Public from '../Layout/Public'
import Forms from '../Components/forms'

export default () => (
  <Switch>
    <Public exact path="/" component={Forms} />
  </Switch>
)
