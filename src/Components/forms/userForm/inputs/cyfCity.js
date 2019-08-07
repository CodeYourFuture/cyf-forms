import React from 'react'

function chooseCity(cities) {
  return cities.cities.map(city => {
    return (
      <option key={city._id} value={city._id}>
        {city.name}
      </option>
    )
  })
}

export default ({ onChange, cityId, cities, isEmpty }) => {
  return (
    <div className="form-group">
      <label htmlor="cityId" className="lead">
        Which CYF city would you like to volunteer for?
      </label>
      <select
        className={`form-control ${isEmpty && 'is-empty'}`}
        id="cityId"
        name="cityId"
        placeholder="Chose"
        value={cityId}
        onChange={onChange}
      >
        <option value="" disabled>
          Select here
        </option>
        <option value="not city yet">not city yet</option>
        {chooseCity(cities)}
      </select>
    </div>
  )
}
