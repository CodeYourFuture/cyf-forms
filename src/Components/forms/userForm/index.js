import React from 'react'
import ApplicationInputs from './inputs'

import './ApplicationForm.css'
import 'react-day-picker/lib/style.css'

export default props => {
  return (
    <div className="form-container container">
      <div className="sign-in">
        <h1 className="font-bold">CYF Volunteer Application Form</h1>
        <p>
          So, you are interested in volunteering for CodeYourFuture? Fantastic!
          We just need a few pieces of information to help us get organised and
          welcome you.
        </p>
        {props.err && (
          <p className="error">
            {props.err}
            {window.scrollTo(0, 0)}
          </p>
        )}
        <form className="mb-4" onSubmit={props.userHandleSubmit} method="post">
          <ApplicationInputs
            onChange={props.onChange}
            {...props}
            dateOfBirthOnChange={props.dateOfBirthOnChange}
            telOnChange={props.telOnChange}
          />
          <button
            disabled={props.disabled}
            className="btn sign-up-btn"
            type="submit"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  )
}
