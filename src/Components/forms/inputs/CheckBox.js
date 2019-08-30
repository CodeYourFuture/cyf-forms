import React from 'react'

export default ({ value, onChange, isEmpty, label, name, checked, id }) => {
  return (
    <div className="form-check">
      <input
        className={`form-check-input ${isEmpty && 'is-empty'}`}
        type="checkbox"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={checked}
      ></input>
      <label htmlFor={id} className="form-check-label">
        {label}
      </label>
    </div>
  )
}
