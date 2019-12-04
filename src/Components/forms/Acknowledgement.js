import React, { Fragment } from 'react'

const CommunityExpectations = () => (
  <Fragment>
    <h1>JOIN OUR COMMUNITY</h1>
    <p>
      Welcome to a fun, inclusive community where your knowledge and expertise
      can transform the lives of refugees, asylum seekers and local
      disadvantaged people. A young nonprofit is a lot like a start-up: growing
      quickly and always looking for versatile, dependable people. You can join
      us in one of 6 CYF cities worldwide or set up a new CYF chapter to support
      your local communities.{' '}
    </p>
    <ul>
      We are looking for volunteers in the following areas:
      <li>
        <strong>Volunteers</strong> from virtually any background to help us run
        and grow our organization (to help with events, marketing, admin, etc.)
      </li>
      <li>
        Professionals from the tech industry to join our
        <strong>mentorship programme</strong> and give a student guidance and
        support
      </li>
      <li>
        <strong>Experienced web developers</strong> (HTML/CSS, JavaScript, Node,
        React, Databases) to help teach our classes
      </li>
    </ul>
    <p>
      Previous volunteers at Code Your Future have developed their skills,
      learnt valuable new ones, and made wonderful friends along the way. Roles
      can last a few weeks, a month, or longer - depending on how much time you
      can commit. Apply using the volunteer form linked below and we'll be in
      touch.
    </p>
  </Fragment>
)

const Modal = ({ selectedModal }) => {
  return (
    <div>
      <div className="modal fade" id={`id-form-acknowledgement`} role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              {selectedModal === 'modal-acknowledgement' && (
                <CommunityExpectations />
              )}
              <div className="modal-footer">
                <span className="close" data-dismiss="modal">
                  close
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ExpectationCheckBox = ({ onChange, checkedExpectations, showModal }) => {
  return (
    <Fragment>
      <input
        className={`form-check-input`}
        type="checkbox"
        name="checkedExpectations"
        onChange={onChange}
        checked={checkedExpectations}
      ></input>
      <label className="form-check-label">
        <span
          id={'modal-acknowledgement'}
          className="form-acknowledgement-read-about"
          data-toggle="modal"
          data-target={`#id-form-acknowledgement`}
          onClick={showModal}
        >
          What to expect when volunteering at CYF
        </span>
      </label>
    </Fragment>
  )
}

const TermsCheckBox = ({ onChange, termsOfUseAndPrivacy, showModal }) => {
  return (
    <Fragment>
      <input
        className={`form-check-input`}
        type="checkbox"
        name="termsOfUseAndPrivacy"
        onChange={onChange}
        checked={termsOfUseAndPrivacy}
      ></input>

      <label className="form-check-label">
        <span
          id={'modal-terms'}
          className="form-acknowledgement-read-about"
          data-toggle="modal"
          data-target={`#id-form-acknowledgement`}
          onClick={showModal}
        >
          Terms Of Use
        </span>{' '}
        and{' '}
        <span
          id={'modal-privacypolicy'}
          className="form-acknowledgement-read-about"
          data-toggle="modal"
          data-target={`#id-form-acknowledgement`}
          onClick={showModal}
        >
          Privacy Policy
        </span>
        .{' '}
      </label>
    </Fragment>
  )
}

export default ({
  onChange,
  checkedExpectations,
  termsOfUseAndPrivacy,
  showModal,
  selectedModal,
  acknowledgementErrors
}) => {
  return (
    <Fragment>
      <span className="form-acknowledgement-header">
        Acknowledgement: (* Required)
      </span>
      <br />
      <br />I have read:
      <div
        className={`form-check ml-4 pl-4 mt-2 ${acknowledgementErrors &&
          'is-empty'}`}
      >
        <ExpectationCheckBox
          onChange={onChange}
          checkedExpectations={checkedExpectations}
          showModal={showModal}
        />
        <br />
        <TermsCheckBox
          showModal={showModal}
          onChange={onChange}
          termsOfUseAndPrivacy={termsOfUseAndPrivacy}
        />
        <Modal selectedModal={selectedModal} />
      </div>
    </Fragment>
  )
}
