import React, { Fragment } from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

export default ({ onChange, agreeToTOU, agreeToReceiveCommunication }) => {
  return (
    <Fragment>
      <div className="form-acknowledgement-header mt-4">Acknowledgement:</div>
      <hr className="mt-0" />
      <p>
        Code Your Future may call you, send you SMS or email you as part of your
        volunteering process with us. Your data is protected in accordance with
        our privacy policy.
      </p>
      <FormGroup check>
        <Label check htmlFor="agreeToTOU">
          <Input
            className={`form-check-input`}
            type="checkbox"
            name="agreeToTOU"
            onChange={onChange}
            id="agreeToTOU"
            checked={agreeToTOU}
          />
          Yes, I have read and accepted the{' '}
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
          </a>{' '}
          <strong className="text-danger">*</strong>
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check htmlFor="agreeToReceiveCommunication">
          <Input
            className={`form-check-input`}
            type="checkbox"
            name="agreeToReceiveCommunication"
            id="agreeToReceiveCommunication"
            onChange={onChange}
            checked={agreeToReceiveCommunication}
          />
          Yes, contact me about volunteering activities and related events{' '}
          <strong className="text-danger">*</strong>
        </Label>
      </FormGroup>
      <p className="pt-2">
        <strong className="text-danger">*</strong> fields are mandatory
      </p>
    </Fragment>
  )
}
