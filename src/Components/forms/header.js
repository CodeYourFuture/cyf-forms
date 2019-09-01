import React, { Fragment } from 'react'

export default ({ err }) => {
  return (
    <Fragment>
      <span className="form-header">
        Code Your Future volunteer application form
      </span>
      <p className="form-description">
        Thank you for your interest. In order to ensure we’re a great fit,
        please complete the form below:
      </p>
      {err && (
        <p className="error">
          {err}
          {window.scrollTo(0, 0)}
        </p>
      )}
    </Fragment>
  )
}
