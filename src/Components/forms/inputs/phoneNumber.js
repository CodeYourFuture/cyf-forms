import React from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput, { formatPhoneNumberIntl } from 'react-phone-number-input'

export default ({ onChange, tel, isEmpty }) => {
  return (
    <div className="form-group">
      <label htmlFor="tel" className="lead">
        <span>Phone number </span>
        <span className="tel-preview">{formatPhoneNumberIntl(tel)}</span>
      </label>
      <PhoneInput
        placeholder="Enter phone number"
        value={tel}
        onChange={e => onChange(e)}
        className={`form-control ${isEmpty && 'is-empty'}`}
      />
    </div>
  )
}
