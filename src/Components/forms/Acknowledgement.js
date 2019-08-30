import React, { Fragment } from 'react'

export default ({ onChange, checked, isEmpty }) => {
  return (
    <Fragment>
      <span className="form-acknowledgement-header">
        Acknowledgement: (* Required)
      </span>
      <div className={`form-check ml-4 pl-4 ${isEmpty && 'is-empty'}`}>
        <input
          className={`form-check-input`}
          type="checkbox"
          name="acknowledgement"
          onChange={onChange}
          checked={checked}
        ></input>
        <label className="form-check-label">
          I have{' '}
          <span
            className="form-acknowledgement-read-about"
            data-toggle="modal"
            data-target={`#id-form-acknowledgement`}
          >
            read about
          </span>{' '}
          what to expect when volunteering at CYF
        </label>

        <div>
          <div
            className="modal fade"
            id={`id-form-acknowledgement`}
            role="dialog"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <div>
                    <h1>JOIN OUR COMMUNITY</h1>
                    <p>
                      Welcome to a fun, inclusive community where your knowledge
                      and expertise can transform the lives of refugees, asylum
                      seekers and local disadvantaged people. A young nonprofit
                      is a lot like a start-up: growing quickly and always
                      looking for versatile, dependable people. You can join us
                      in one of 6 CYF cities worldwide or set up a new CYF
                      chapter to support your local communities.{' '}
                    </p>
                    <ul>
                      We are looking for volunteers in the following areas:
                      <li>
                        <strong>Volunteers</strong> from virtually any
                        background to help us run and grow our organization (to
                        help with events, marketing, admin, etc.)
                      </li>
                      <li>
                        Professionals from the tech industry to join our
                        <strong>mentorship programme</strong> and give a student
                        guidance and support
                      </li>
                      <li>
                        <strong>Experienced web developers</strong> (HTML/CSS,
                        JavaScript, Node, React, Databases) to help teach our
                        classes
                      </li>
                    </ul>
                    <p>
                      Previous volunteers at Code Your Future have developed
                      their skills, learnt valuable new ones, and made wonderful
                      friends along the way. Roles can last a few weeks, a
                      month, or longer - depending on how much time you can
                      commit. Apply using the volunteer form linked below and
                      we'll be in touch.
                    </p>
                  </div>
                </div>
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">
                    Become a Volunteer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
