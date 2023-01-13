import React, { useState } from 'react'
import { Label } from 'reactstrap'

export default ({ employerOnChange, isEmpty, label, name, arrayList }) => {
  const [value, setValue] = useState('')

  const onType = e => {
    setValue(e.target.value)
  }

  const onSearch = searchTerm => {
    setValue(searchTerm)
    employerOnChange(searchTerm)
  }
  return (
    <div className="form-group">
      <Label htmlFor={name}>{label}</Label>
      <input
        className={`form-control ${isEmpty && 'is-empty'}`}
        type="text"
        id={name}
        value={value}
        onChange={onType}
        placeholder="Type your employer name here"
      />
      {arrayList
        .filter(item => {
          const searchTerm = value.toLowerCase()
          const employer = item.name.toLowerCase()

          return (
            searchTerm &&
            employer.startsWith(searchTerm) &&
            employer !== searchTerm
          )
        })
        .slice(0, 10)
        .map(item => (
          <option
            onClick={() => {
              onSearch(item.name)
            }}
            key={item._id}
            className="employer-option"
          >
            {item.name}
          </option>
        ))}
    </div>
  )
}
