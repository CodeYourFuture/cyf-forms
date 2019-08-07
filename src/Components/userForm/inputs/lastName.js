import React from 'react'

export default ({ onChange, lastName, isEmpty }) => {
  return (
    <div className="form-group application-form-section-one-items">
      <label htmlFor="lastName" className="lead">
        Last Name
      </label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        className={`form-control ${isEmpty && 'is-empty'}`}
        placeholder="Your last name..."
        value={lastName}
        onChange={onChange}
      />
    </div>
  )
}
