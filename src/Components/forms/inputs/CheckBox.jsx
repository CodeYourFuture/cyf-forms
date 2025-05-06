import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

export default ({ value, onChange, isEmpty, label, name, checked, id }) => {
  return (
    <FormGroup check>
      <Label check htmlFor={id}>
        <Input
          className={`form-check-input ${isEmpty && 'is-empty'}`}
          type="checkbox"
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          checked={checked}
        />{' '}
        {label}
      </Label>
    </FormGroup>
  )
}
