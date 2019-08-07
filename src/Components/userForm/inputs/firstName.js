import React from 'react'

export default ({ firstName, onChange, isEmpty }) => {
  return (
    <div className="form-group application-form-section-one-items">
      <label htmlFor="firstName" className="lead">
        First Name
      </label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        className={`form-control ${isEmpty && 'is-empty'}`}
        placeholder="Your first name..."
        value={firstName}
        onChange={onChange}
      />
    </div>
  )
}
