import React from 'react'

export default ({ teachingCode, RunningAndGrowing, onChange }) => {
  return (
    <div className="form-group application-form-section-one-items">
      <label className="lead">
        <h2>Cool. What are you interested in helping with?</h2>
        Choose as many as you like
      </label>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value={teachingCode}
          name="teachingCode"
          id="teachingCode"
          onChange={onChange}
        />
        <label className="form-check-label" htmlFor="teachingCode">
          Teaching code or agile methodologies
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value={RunningAndGrowing}
          name="RunningAndGrowing"
          id="RunningAndGrowing"
          onChange={onChange}
        />
        <label className="form-check-label" htmlFor="RunningAndGrowing">
          Running and growing the organisation
        </label>
      </div>
    </div>
  )
}
