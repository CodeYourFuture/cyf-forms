import React, { Fragment } from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

export default ({
  onChange,
  termsOfUseAndPrivacy,
  agreeToReceiveEmails,
  agreeToReceivePhoneCall,
  agreeToReceiveCYFNews
}) => {
  return (
    <Fragment>
      <span className="form-acknowledgement-header">
        Acknowledgement: (* Required)
      </span>
      <br />
      <FormGroup check>
        <Label check htmlFor="termsOfUseAndPrivacy">
          <Input
            className={`form-check-input`}
            type="checkbox"
            name="termsOfUseAndPrivacy"
            onChange={onChange}
            id="termsOfUseAndPrivacy"
            checked={termsOfUseAndPrivacy}
          />
          I have read and accepted to the{' '}
          <a
            href="https://codeyourfuture.io/terms/"
            target="_blank"
            rel="noopener noreferrer"
          >
            terms of use
          </a>{' '}
          and{' '}
          <a
            href="https://codeyourfuture.io/privacy-policy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            privacy policy
          </a>
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check htmlFor="agreeToReceiveEmails">
          <Input
            className={`form-check-input`}
            type="checkbox"
            name="agreeToReceiveEmails"
            id="agreeToReceiveEmails"
            onChange={onChange}
            checked={agreeToReceiveEmails}
          />
          Send me emails relevant to my volunteering (mandatory)
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check htmlFor="agreeToReceivePhoneCall">
          <Input
            className={`form-check-input`}
            type="checkbox"
            name="agreeToReceivePhoneCall"
            id="agreeToReceivePhoneCall"
            onChange={onChange}
            checked={agreeToReceivePhoneCall}
          />
          Contact me via telephone in regards to volunteering
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check htmlFor="agreeToReceiveCYFNews">
          <Input
            className={`form-check-input`}
            type="checkbox"
            name="agreeToReceiveCYFNews"
            id="agreeToReceiveCYFNews"
            onChange={onChange}
            checked={agreeToReceiveCYFNews}
          />
          Contact me via email about events and other CYF news
        </Label>
      </FormGroup>
    </Fragment>
  )
}
