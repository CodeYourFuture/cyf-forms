import React, { Fragment } from 'react'

export default props => (
  <Fragment>
    <p className="login-p1">Welcome</p>
    <form className="mt-0" onSubmit={props.handleSubmit}>
      <div className="form-group-login">
        <label htmlFor="email" className="lead">
          Log in with email
        </label>
        {props.error && <p className="errors">{props.error}</p>}
        <div>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control2"
            value={props.email}
            required
            onChange={props.onChange}
          />
          <button
            disabled={props.email === ' '}
            className="sign-up-btnn"
            type="submit"
            name="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
    <p className="line1">or</p>
  </Fragment>
)
