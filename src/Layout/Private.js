import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import * as AuthService from './AuthService'

export default ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return AuthService.loggedIn() ? (
          <div>
            <Component {...props} />
          </div>
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }}
          />
        )
      }}
    />
  )
}
