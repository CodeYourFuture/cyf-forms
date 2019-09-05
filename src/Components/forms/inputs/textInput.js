import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'
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
    <FormGroup>
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        name={name}
        id={name}
        className={`form-control ${isEmpty && 'is-empty'}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </FormGroup>
  )
}
