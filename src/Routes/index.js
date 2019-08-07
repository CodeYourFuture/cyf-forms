import React from 'react'
import { Switch } from 'react-router-dom'
import UserForm from '../Components/userForm'
import Public from '../Layout/Public'

export default () => (
  <Switch>
    <Public exact path="/" component={UserForm} />
  </Switch>
)
