import React from 'react'

export default ({
  value,
  onChange,
  isEmpty,
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
      {isEmpty && <span>{window.scrollTo(0, 200)}</span>}
    </div>
  )
}
