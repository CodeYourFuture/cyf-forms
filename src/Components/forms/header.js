import React from 'react'

export default ({ err, formInComplete, userId }) => {
  return (
    <div>
      <div className="mb-2">
        {err && (
          <p className="errors">
            {err}
            {window.scrollTo(0, 0)}
          </p>
        )}
        {formInComplete ? (
          <p className="errors">
            Form is incomplete, please check all your details.
            {window.scrollTo(0, 0)}
          </p>
        ) : (
          ''
        )}
      </div>
      <span className="form-header">Volunteer Application Form</span>
      <hr />
      {userId ? (
        <p className="form-description">
          You have been re-directed to fill in this form, in order for you to
          gain access to the Code Your Future Admin dashboard.
        </p>
      ) : (
        <p className="form-description">
          Thank you for your interest! To ensure we’re a great fit, please
          complete the form below:
        </p>
      )}
    </div>
  )
}
