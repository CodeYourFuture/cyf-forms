import React from 'react'
import { Label } from 'reactstrap'
import 'react-phone-number-input/style.css'
import PhoneInput, { formatPhoneNumberIntl } from 'react-phone-number-input'

export default ({ onChange, tel, isEmpty }) => {
  const inputId = 'phone-number-input'
  return (
    <div className="form-group">
      <Label htmlFor={inputId}>
        <span>Phone number *</span>
        <span className="tel-preview">{formatPhoneNumberIntl(tel)}</span>
      </Label>
      <PhoneInput
        className={`form-control ${isEmpty && 'is-empty'}`}
        id={inputId}
        onChange={e => onChange(e)}
        placeholder="Enter phone number"
        value={tel}
      />
    </div>
  )
}
