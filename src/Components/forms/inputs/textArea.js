import PropTypes from 'prop-types'
import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

const TextArea = ({
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
        className={`form-control form-control-text-area ${isEmpty &&
          'is-empty'}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </FormGroup>
  )
}

TextArea.propTypes = {
  isEmpty: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any
}

export default TextArea
