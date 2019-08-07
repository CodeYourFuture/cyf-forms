import React from 'react'

export default ({ email, onChange, isEmpty, emailExist }) => {
  return (
    <div className="form-group application-form-section-one-items">
      <label htmlFor="email" className="lead">
        Email
      </label>
      <input
        type="text"
        name="email"
        id="email"
        className={`form-control ${isEmpty && 'is-empty'}`}
        placeholder="Example@example.example"
        value={email}
        onChange={onChange}
      />
      {emailExist && (
        <span style={{ color: '#dc0000' }}>
          This email already exist.
          {window.scrollTo(0, 200)}
        </span>
      )}
    </div>
  )
}
