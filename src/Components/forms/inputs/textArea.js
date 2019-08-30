import React from 'react'

export default ({
  value,
  onChange,
  isEmpty,
  emailExist,
  label,
  name,
  placeholder,
  type
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="lead">
        {label}
      </label>
      <textarea
        type={type}
        name={name}
        id={name}
        className={`form-control form-control-text-area ${isEmpty &&
          'is-empty'}`}
        placeholder={placeholder}
        value={value}
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
