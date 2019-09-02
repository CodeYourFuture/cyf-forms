import React from 'react'

export default ({ value, onChange, name, checked }) => {
  return (
    <input
      className="form-check-input"
      type="radio"
      name={name}
      id={name}
      onChange={onChange}
      value={value}
      checked={checked}
    />
  )
}
