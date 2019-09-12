import React from 'react'
import { Label } from 'reactstrap'
import 'react-phone-number-input/style.css'
import PhoneInput, { formatPhoneNumberIntl } from 'react-phone-number-input'

export default ({ onChange, tel, isEmpty }) => {
  return (
    <div className="form-group">
      <Label>
        <span>Phone number *</span>
        <span className="tel-preview">{formatPhoneNumberIntl(tel)}</span>
      </Label>
      <PhoneInput
        placeholder="Enter phone number"
        value={tel}
        onChange={e => onChange(e)}
        className={`form-control ${isEmpty && 'is-empty'}`}
      />
    </div>
  )
}
