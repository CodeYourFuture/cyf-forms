import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'
import RequiredFlag from '../RequiredFlag'

export default ({
  value,
  onChange,
  isEmpty,
  isRequired,
  label,
  name,
  placeholder,
  type
}) => {
  return (
    <FormGroup>
      <Label htmlFor={name}>{label}{isRequired ? ' ' : ''}{isRequired ? <RequiredFlag /> : ''}</Label>
      <Input
        type={type}
        name={name}
        id={name}
        className={`form-control form-control-text-area ${
          isEmpty && 'is-empty'
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </FormGroup>
  )
}
