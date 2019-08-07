import React from 'react'

export default ({ city, onChange, isEmpty }) => {
  return (
    <div className="form-group">
      <label htmlFor="city" className="lead">
        In which city do you live?
      </label>
      <input
        type="text"
        name="city"
        id="city"
        className={`form-control ${isEmpty && 'is-empty'}`}
        placeholder="Example... London"
        value={city}
        onChange={onChange}
      />
    </div>
  )
}
